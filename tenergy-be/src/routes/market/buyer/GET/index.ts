import { demandFunction } from "@utils";
import {
  ControlConfigModel,
  MonthMeterDataModel,
  MonthMeterHistoryModel,
} from "@models";
import { loginCheck } from "@mw";
import Express from "express";
import _ from "lodash";
import { ReqRootQuery } from "../../GET/types";
import { StatusCodes } from "http-status-codes";

const routes = Express.Router();

routes.get(
  "/",
  loginCheck,
  async (
    req: Express.Request<any, any, ReqRootQuery>,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const { quantity } = req.query;
    const controlConfig = await ControlConfigModel.find(
      {},
      { _id: 0, month: 1 },
      {
        sort: { updatedAt: -1 },
      }
    );
    const monthMeterData = await MonthMeterDataModel.find(
      {
        role: "buyer",
      },
      { _id: 1, name: 1, kwh: 1 }
    );
    const householdNames = _.map(monthMeterData, (meter) => meter.name);
    const history = await MonthMeterHistoryModel.find(
      { name: { $in: householdNames } },
      {
        _id: 1,
        name: 1,
        kwh: { $slice: -7 },
      },
      { sort: { kwh: -1 } }
    );
    // [household name, household now usage, household prev usage, kwh]
    const buyers = _.map(history, (h) => [
      h.name,
      demandFunction(
        _.nth(h.kwh, -1)!,
        parseInt(quantity as string),
        controlConfig[0].month
      ),
      demandFunction(
        _.nth(h.kwh, -2)!,
        parseInt(quantity as string),
        controlConfig[0].month
      ),
      demandFunction(
        _.nth(h.kwh, -1)!,
        parseInt(quantity as string),
        controlConfig[0].month
      ) -
        demandFunction(
          _.nth(h.kwh, -2)!,
          parseInt(quantity as string),
          controlConfig[0].month
        ),
      h.kwh,
    ]);
    const [, nowPrice, prevPrice] = _.unzip(buyers);
    const nowMean = _.mean(_.filter(nowPrice, (price) => price !== 0));
    const prevMean = _.mean(_.filter(prevPrice, (price) => price !== 0));

    return res.status(StatusCodes.OK).json({
      average: nowMean,
      prevErr: nowMean - prevMean,
      buyers: _.map(buyers, (buyer) =>
        _.zipObject(["name", "nowPrice", "prevPrice", "err", "history"], buyer)
      ),
      //   buyers: _.zipObject(
      //     ["name", "nowPrice", "prevPrice", "err", "history"],
      //     names,
      //     nowPrice,
      //     prevPrice,
      //     err,
      //     histories
      //   ),
    });
  }
);

export default routes;

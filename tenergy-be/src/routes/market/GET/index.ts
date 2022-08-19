import { demandFunction, getRole } from "@utils";
import { ResponseError } from "@common";
import {
  ControlConfigModel,
  HistoryModel,
  MonthMeterHistoryModel,
} from "@models";
import { loginCheck } from "@mw";
import Express from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import { ReqRootQuery } from "./types";

const routes = Express.Router();

// root market count, 평군 환율, 거래가능 사용량
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
    console.log(controlConfig);
    const _history = await HistoryModel.find(
      {},
      {
        _id: 0,
        buyerCount: { $slice: -1 },
        sellerCount: { $slice: -1 },
        tradable: { $slice: -7 },
        APT: 0,
        public: 0,
        controlId: 0,
        updatedAt: 0,
        createdAt: 0,
        __v: 0,
      },
      { sort: { updatedAt: -1 } }
    );
    if (_history.length === 0)
      return next(
        new ResponseError(
          StatusCodes.NOT_FOUND,
          "관리자 측에서 설정한 제어정보가 없습니다."
        )
      );
    let history = _history[0].toObject();
    // console.log(history);

    const _monthMeterHistory = await MonthMeterHistoryModel.find(
      {},
      {
        kwh: { $slice: -7 },
        _id: 0,
        name: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      }
    );
    const monthMeterHistory = _.map(_monthMeterHistory, ({ kwh }) => kwh);
    const buyerMeterHistory = _.filter(
      monthMeterHistory,
      (history) =>
        getRole(_.nth(history, -1)!, controlConfig[0].month) === "buyer"
    );
    console.log("buyer", buyerMeterHistory);

    const demandsHistory = _.map(buyerMeterHistory, (meters) =>
      _.map(meters, (m) =>
        demandFunction(m, parseInt(quantity as string), controlConfig[0].month)
      )
    );
    console.log(demandsHistory);
    const zipDemands = _.zip.apply(null, demandsHistory);
    console.log(zipDemands);
    const average = _.map(zipDemands!, (demands) => {
      const mean = _.mean(_.filter(demands!, (demand) => demand! !== 0));

      return _.isNaN(mean) ? 0 : mean;
    });
    console.log(average);

    return res.status(StatusCodes.OK).json({
      ..._.mapValues(history, (h) =>
        (h as number[]).length === 1 ? (h as number[])[0] : h
      ),
      average,
    });
  }
);

export default routes;

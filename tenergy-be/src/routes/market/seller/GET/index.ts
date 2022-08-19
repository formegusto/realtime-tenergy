import { monthToSeason } from "@utils";
import { NUGIN_ERR, ResponseError } from "@common";
import {
  ControlConfigModel,
  HistoryModel,
  MonthMeterDataModel,
  MonthMeterHistoryModel,
} from "@models";
import { loginCheck } from "@mw";
import Express from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";

const routes = Express.Router();

routes.get(
  "/",
  loginCheck,
  async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const _control = await ControlConfigModel.find(
      {},
      { _id: 1, month: 1 },
      { sort: { updatedAt: -1 } }
    );
    if (_control.length === 0)
      return next(
        new ResponseError(
          StatusCodes.NOT_FOUND,
          "관리자 측에서 설정한 제어정보가 없습니다."
        )
      );
    const control = _control[0].toObject();
    const sellerMaxUsage = NUGIN_ERR[monthToSeason(control.month)][0];

    console.log(sellerMaxUsage);

    const monthMeterData = await MonthMeterDataModel.find(
      {
        role: "seller",
      },
      { name: 1, kwh: 1 }
    );
    const householdNames = _.map(monthMeterData, (meter) => meter.name);
    const monthMeterHistory = await MonthMeterHistoryModel.find(
      {
        name: { $in: householdNames },
      },
      { _id: 1, name: 1, kwh: { $slice: -7 } }
    );
    console.log(monthMeterHistory);
    console.log(householdNames.length, monthMeterHistory.length);

    const history = await HistoryModel.findOne(
      { controlId: control._id },
      {
        _id: 1,
        tradable: { $slice: -2 },
      }
    );
    console.log(history);

    return res.status(StatusCodes.OK).json({
      tradableUsage: {
        kwh: Math.round(history!.tradable[1]),
        prevErr: Math.round(history!.tradable[1] - history!.tradable[0]),
      },
      sellers: monthMeterHistory,
    });
  }
);

export default routes;

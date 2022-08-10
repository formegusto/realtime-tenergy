import Express from "express";
import { adminCheck, controlCheck, loginCheck } from "@mw";
import {
  ControlConfigModel,
  MonthMeterDataModel,
  MonthMeterHistoryModel,
} from "@models";
import { StatusCodes } from "http-status-codes";
import { ResponseError } from "@common";
import { demandFunction, generateToken, getRole } from "@utils";
import _ from "lodash";

const routes: Express.Router = Express.Router();

// // login test용
// routes.get(
//   "/test",
//   loginCheck,
//   controlCheck,
//   async (req: Express.Request, res: Express.Response) => {
//     const { _id } = req.control;

//     const monthMeterData = await MonthMeterDataModel.find({});
//     const usages = _.map(monthMeterData, (meter) => meter.kwh);
//     const distributor = new Distributor(usages);

//     // await Distributor.update();

//     console.log(distributor.binValues);

//     return res.send("Test");
//   }
// );

routes.get(
  "/demandfunction",
  loginCheck,
  controlCheck,
  async (req: Express.Request, res: Express.Response) => {
    const { month } = req.control;
    const buyerMonthMeter = await MonthMeterDataModel.find(
      { role: "buyer" },
      { name: 1, _id: 0, kwh: 1 }
    );
    console.log(buyerMonthMeter);

    const totalDemands = _.map(buyerMonthMeter, (meter) =>
      demandFunction(meter.kwh, 1, month)
    );
    console.log(totalDemands);

    const meterMean = _.meanBy(buyerMonthMeter, (meter) => meter.kwh);

    const totalAverage = _.mean(totalDemands);
    console.log(totalAverage, demandFunction(meterMean, 1, month));

    return res.send("수요함수 테스팅");
  }
);

routes.get(
  "/demandfunction/7d",
  loginCheck,
  controlCheck,
  async (req: Express.Request, res: Express.Response) => {
    // 나중에 quantity 받아야 함.
    const { month, day } = req.control;

    const CHARTDAY = 7;
    const startDay = day.now;
    const endDay = day.now - CHARTDAY;
    const totalAverages: Array<number> = [];

    for (let d = startDay; d > endDay && d > 0; d--) {
      const meterHistory = await MonthMeterHistoryModel.find(
        {},
        {
          _id: 0,
          kwh: { $slice: [d, 1] },
        }
      );
      const buyerHistories = _.filter(
        meterHistory,
        (meter) => getRole(meter.kwh[0], month) === "buyer"
      );
      let demands = _.map(buyerHistories, (meter) =>
        demandFunction(meter.kwh[0], 1, month)
      );
      demands = _.filter(demands, (d) => d > 0);
      console.log(_.mean(demands));
    }
    return res.send("수요함수(7d) 테스팅");
  }
);

routes.get(
  "/",
  adminCheck,
  async (req: Express.Request, res: Express.Response) => {
    const controls = await ControlConfigModel.find(
      {},
      { __v: 0 },
      { sort: [{ updatedAt: -1 }] }
    );

    return res.status(StatusCodes.OK).json({
      controls,
    });
  }
);

// control 토큰 재발급
routes.get(
  "/:id",
  adminCheck,
  async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const { id: controlId } = req.params;

    const control = await ControlConfigModel.findById(controlId);
    if (!control)
      next(
        new ResponseError(StatusCodes.BAD_REQUEST, "잘못된 제어번호 입니다.")
      );

    const token = generateToken(
      {
        control,
      },
      "3d"
    );

    return res.status(StatusCodes.CREATED).json({
      token,
    });
  }
);

export default routes;

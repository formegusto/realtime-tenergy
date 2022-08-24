import { ControlConfig, MonthMeterData } from "@models/types";
import { ResponseError } from "@common";
import { APTModel, HistoryModel, MonthMeterDataModel } from "@models";
import { loginCheck } from "@mw";
import Express from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import { APT } from "./types";

const routes = Express.Router();

// root - apt 정보, 평균정보 및 히스토리
routes.get(
  "/",
  loginCheck,
  async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const _apt = await APTModel.find(
      {},
      {
        _id: 0,
        apt: 1,
        household: 1,
        public: 1,
        householdCount: 1,
        controlId: 1,
      },
      { sort: { updatedAt: -1 } }
    );

    if (_apt.length === 0)
      return next(
        new ResponseError(
          StatusCodes.NOT_FOUND,
          "관리자 측에서 설정한 제어정보가 없습니다."
        )
      );
    const apt = _apt[0].toObject() as APT;
    const { controlId } = apt;
    delete (apt as any).controlId;
    console.log("apt 정보", apt);

    const { householdCount } = apt;
    const aptMean = _.mapValues(apt, (a) =>
      Math.round((a as number) / householdCount)
    );
    delete (aptMean as any).householdCount;
    aptMean.trading = 0;
    console.log("apt 평균정보", aptMean);

    const history = await HistoryModel.findOne(
      { controlId },
      { _id: 0, APT: { $slice: -7 } }
    );
    console.log("apt history", history);

    return res.status(StatusCodes.OK).json({
      apt,
      aptMean,
      history: history?.APT,
    });
  }
);

export default routes;

import { ResponseError } from "@common";
import {
  APTModel,
  ControlConfigModel,
  MixedDataBuilder,
  MonthMeterDataModel,
} from "@models";
import { loginCheck } from "@mw";
import Express from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";

const routes = Express.Router();

// root
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
    const apt = await APTModel.findOne(
      { controlId: control._id },
      { _id: 0, createdAt: 0, updatedAt: 0, __v: 0, controlId: 0 }
    );

    // bill calc
    const builder = new MixedDataBuilder();
    await builder.step1(control.month);
    builder.step2!(apt!.apt, control.month);

    const mixedData = builder.get();
    const publicPrice = mixedData.publicPrice;
    console.log("Public Price", publicPrice);

    return res.status(StatusCodes.OK).json({
      publicPrice,
    });
  }
);

export default routes;

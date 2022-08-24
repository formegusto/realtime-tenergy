import { MonthMeterData } from "@models/types";
import { ResponseError } from "@common";
import {
  ControlConfigModel,
  MixedDataBuilder,
  MonthMeterDataModel,
  MonthMeterHistoryModel,
} from "@models";
import { loginCheck } from "@mw";
import Express from "express";
import { StatusCodes } from "http-status-codes";

const routes = Express.Router();

routes.get(
  "/",
  loginCheck,
  async (req: Express.Request, res: Express.Response) => {
    const { name } = req.household;
    const monthMeterDataDocs = await MonthMeterDataModel.findOne({ name });
    if (!monthMeterDataDocs)
      throw new ResponseError(
        StatusCodes.FORBIDDEN,
        "존재하지 않는 가구 정보 입니다."
      );

    const control = await ControlConfigModel.find(
      {},
      { _id: 1, month: 1 },
      { sort: { updatedAt: -1 } }
    );
    if (control.length === 0)
      throw new ResponseError(
        StatusCodes.NOT_FOUND,
        "관리자 측에서 설정한 제어정보가 없습니다."
      );
    const monthMeterData = MonthMeterData.getFromDocument(
      monthMeterDataDocs,
      control[0].month
    );

    const builder = new MixedDataBuilder();
    const mixedData = builder.get();
    await builder.set(control[0], name);

    const APTUsage = mixedData.apt!.kwh * mixedData.households!.length;
    const distributor = mixedData.distributor!;
    await distributor.setHouseholds();
    await distributor.setMixedData(APTUsage, control[0].month);
    // console.log(mixedData.houesholdIntegratedBill);

    // history
    const monthMeterHistory = await MonthMeterHistoryModel.findOne(
      { name },
      { _id: 1, kwh: { $slice: -7 } }
    );
    console.log(monthMeterHistory);

    console.log(mixedData.trades);
    const houesholdIntegratedBill = await mixedData.houesholdIntegratedBill();
    console.log(houesholdIntegratedBill);

    return res.status(StatusCodes.OK).json({
      ...houesholdIntegratedBill,
      history: monthMeterHistory!.kwh,
    });
  }
);

export default routes;

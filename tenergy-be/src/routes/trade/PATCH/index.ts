import { ControlConfig, MonthMeterData } from "@models/types";
import { TradeMixedDataBuilder, TradeModel } from "@models";
import { loginCheck } from "@mw";
import Express from "express";
import { StatusCodes } from "http-status-codes";
import { TradeStatusRequest } from "../types";
import { ResponseError } from "@common";

const routes = Express.Router();

routes.patch(
  "/",
  loginCheck,
  async (
    req: Express.Request<any, any, TradeStatusRequest>,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const { id, status } = req.body;

    await TradeModel.updateOne({ _id: id }, { $set: { status } });
    const trade = await TradeModel.findById(id);

    // 변경하면서 history에 때려넣어줘야 함
    const controlConfig = await ControlConfig.getRecently();
    if (!trade || !controlConfig)
      return next(
        new ResponseError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "디용 이게 무슨일이지"
        )
      );

    const builder = new TradeMixedDataBuilder(trade.id, trade.quantity);
    const tradeMixedData = builder.get();
    await builder.step1(trade.requester, trade.responser);

    tradeMixedData.pushHistory(controlConfig.day.now);

    return res.status(StatusCodes.OK);
  }
);

export default routes;

import { ControlConfig, MonthMeterData } from "@models/types";
import { MonthMeterDataModel, TradeModel } from "@models";
import { loginCheck } from "@mw";
import Express from "express";
import { StatusCodes } from "http-status-codes";
import { TradeRequest } from "../types";

const routes = Express.Router();

routes.post(
  "/",
  loginCheck,
  async (
    req: Express.Request<any, any, TradeRequest>,
    res: Express.Response
  ) => {
    const { requester, responser, quantity } = req.body;

    const controlConfig = await ControlConfig.getRecently();

    const requestTrade = await TradeModel.create({
      requester,
      responser,
      quantity,
      day: controlConfig.day.now,
    });

    const responserMeterData = await MonthMeterDataModel.findOne({
      name: responser,
    });
    const socketId = responserMeterData?.socketId;
    if (socketId) {
      const io = req.app.get("io") as any;
      io.to(socketId).emit("new-trade-request", {
        message: "새 거래 요청이 들어왔습니다.",
        id: requestTrade.id,
      });
    }

    return res.status(StatusCodes.CREATED).json(requestTrade);
  }
);

export default routes;

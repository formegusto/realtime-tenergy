import { TradeModel } from "@models";
import { ControlConfig } from "@models/types";
import { loginCheck } from "@mw";
import Express from "express";
import { StatusCodes } from "http-status-codes";
import { ReqPostTradeBody } from "./types";

const routes = Express.Router();

routes.post(
  "/",
  loginCheck,
  async (
    req: Express.Request<any, any, ReqPostTradeBody>,
    res: Express.Response
  ) => {
    const { requester, responser, quantity } = req.body;

    const requestTrade = await TradeModel.create({
      requester,
      responser,
      quantity,
    });

    return res.status(StatusCodes.CREATED).json(requestTrade);
  }
);

export default routes;

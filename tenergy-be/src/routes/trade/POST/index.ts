import { TradeModel } from "@models";
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

    const requestTrade = await TradeModel.create({
      requester,
      responser,
      quantity,
    });

    return res.status(StatusCodes.CREATED).json(requestTrade);
  }
);

export default routes;

import { AdvancedTrade } from "@models/types";
import { TradeModel } from "@models";
import { loginCheck } from "@mw";
import Express from "express";
import _ from "lodash";
import { StatusCodes } from "http-status-codes";

const routes = Express.Router();

routes.get(
  "/request",
  loginCheck,
  async (req: Express.Request, res: Express.Response) => {
    const { name: responser } = req.household;

    const _tradeRequests = await TradeModel.find(
      { responser },
      {},
      { sort: { createdAt: 1 } }
    );
    const tradeRequests = await Promise.all(
      _.map(_tradeRequests, (trade) => AdvancedTrade.get(trade))
    );

    return res.status(StatusCodes.OK).json(tradeRequests);
  }
);

export default routes;

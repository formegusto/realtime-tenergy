import { loginCheck } from "@mw";
import Express from "express";
import { StatusCodes } from "http-status-codes";
import { TradeStatusRequest } from "../types";

const routes = Express.Router();

routes.patch(
  "/",
  loginCheck,
  async (
    req: Express.Request<any, any, TradeStatusRequest>,
    res: Express.Response
  ) => {
    const { id, status } = req.body;

    console.log(id, status);

    return res.status(StatusCodes.OK).json();
  }
);

export default routes;

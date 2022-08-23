import { loginCheck } from "@mw";
import Express from "express";
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

    // check

    return res.send("test");
  }
);

export default routes;

import { MonthMeterDataModel } from "@models";
import { loginCheck } from "@mw";
import Express from "express";
import { StatusCodes } from "http-status-codes";

const routes = Express.Router();

// 건물 정보
routes.get(
  "/",
  loginCheck,
  async (req: Express.Request, res: Express.Response) => {
    const { name } = req.household;
    const meterData = await MonthMeterDataModel.findOne({ name });

    return res.status(StatusCodes.OK).json({ household: meterData });
  }
);

export default routes;

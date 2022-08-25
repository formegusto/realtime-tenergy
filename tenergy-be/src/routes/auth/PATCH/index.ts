import { MonthMeterDataModel } from "@models";
import { loginCheck } from "@mw";
import Express from "express";
import { StatusCodes } from "http-status-codes";
import { PatchAuthBody } from "./types";

const routes = Express.Router();

routes.patch(
  "/:id",
  loginCheck,
  async (
    req: Express.Request<any, any, PatchAuthBody>,
    res: Express.Response
  ) => {
    const { id } = req.params;
    const { quantity } = req.body;

    const newHousehold = await MonthMeterDataModel.findByIdAndUpdate(
      id,
      {
        $set: { quantity },
      },
      {
        new: true,
      }
    );
    console.log(newHousehold);

    return res.status(StatusCodes.OK).json({ household: newHousehold });
  }
);

export default routes;

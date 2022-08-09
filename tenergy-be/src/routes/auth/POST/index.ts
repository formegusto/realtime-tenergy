import { HouseholdModel } from "@models";
import { ResponseError } from "@common";
import Express from "express";
import { StatusCodes } from "http-status-codes";
import { generateToken } from "@utils";

const routes = Express.Router();

routes.post(
  "/",
  async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    // request check
    const { name } = req.body;
    if (!name)
      return next(
        new ResponseError(StatusCodes.BAD_REQUEST, "건물명을 입력해주세요.")
      );

    const household = await HouseholdModel.findOne({ name });
    if (!household)
      return next(
        new ResponseError(StatusCodes.NOT_FOUND, "존재하지 않는 건물입니다.")
      );
    const token = generateToken(
      {
        household,
      },
      "3h"
    );

    return res.status(StatusCodes.OK).json({ token });
  }
);

export default routes;

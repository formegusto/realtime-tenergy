import Express from "express";
import { adminCheck } from "@mw";
import { ControlConfigModel } from "@models";
import { StatusCodes } from "http-status-codes";
import { ResponseError } from "@common";
import { generateToken } from "@utils";

const routes: Express.Router = Express.Router();

routes.get(
  "/",
  adminCheck,
  async (req: Express.Request, res: Express.Response) => {
    const controls = await ControlConfigModel.find(
      {},
      { __v: 0 },
      { sort: [{ updatedAt: -1 }] }
    );

    return res.status(StatusCodes.OK).json({
      controls,
    });
  }
);

// control 토큰 재발급
routes.get(
  "/:id",
  adminCheck,
  async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const { id: controlId } = req.params;

    const control = await ControlConfigModel.findById(controlId);
    if (!control)
      next(
        new ResponseError(StatusCodes.BAD_REQUEST, "잘못된 제어번호 입니다.")
      );

    const token = generateToken(
      {
        control,
      },
      "3d"
    );

    return res.status(StatusCodes.CREATED).json({
      token,
    });
  }
);

export default routes;

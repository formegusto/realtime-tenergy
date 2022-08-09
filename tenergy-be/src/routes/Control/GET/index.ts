import Express from "express";
import { adminCheck, controlCheck, loginCheck } from "@mw";
import { ControlConfigModel, MonthMeterDataModel } from "@models";
import { Distributor } from "@models/types";
import { StatusCodes } from "http-status-codes";
import { ResponseError } from "@common";
import { generateToken } from "@utils";
import _ from "lodash";

const routes: Express.Router = Express.Router();

// // login test용
// routes.get(
//   "/test",
//   loginCheck,
//   controlCheck,
//   async (req: Express.Request, res: Express.Response) => {
//     const { _id } = req.control;

//     const monthMeterData = await MonthMeterDataModel.find({});
//     const usages = _.map(monthMeterData, (meter) => meter.kwh);
//     const distributor = new Distributor(usages);

//     // await Distributor.update();

//     console.log(distributor.binValues);

//     return res.send("Test");
//   }
// );

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

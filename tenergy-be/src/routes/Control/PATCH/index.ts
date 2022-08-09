import Express from "express";
import _ from "lodash";
import { StatusCodes } from "http-status-codes";
import { controlCheck, loginCheck } from "@mw";
import {
  APTModel,
  DayMeterDataModel,
  MonthMeterDataModel,
  ControlConfigModel,
} from "@models";
import { ResponseError } from "@common";
import { generateToken } from "@utils";

const routes: Express.Router = Express.Router();

routes.patch(
  "/next",
  loginCheck,
  controlCheck,
  async (req: Express.Request, res: Express.Response) => {
    const {
      _id: controlId,
      aptId,
      month,
      day,
      increasePublicUsage,
    } = req.control;
    console.log(req.control);
    let { now, max } = day;

    if (now >= max)
      throw new ResponseError(StatusCodes.NO_CONTENT, "종료된 작업입니다.");
    // MonthMeter Update
    now++;

    const dayMeter = await DayMeterDataModel.findOne({
      $and: [
        { $expr: { $eq: [{ $month: "$time" }, month] } },
        { $expr: { $eq: [{ $dayOfMonth: "$time" }, now] } },
      ],
    });
    const dayMeterDatas = dayMeter!.data;
    const monthMeter = await MonthMeterDataModel.find({});
    const newMonthMeter = _.map(dayMeterDatas, (meter) => {
      const _monthMeter = {
        ..._.find(monthMeter, { name: meter.name })?.toObject(),
      };
      _monthMeter.kwh! += meter.kwh;
      return _monthMeter;
    });
    _.forEach(newMonthMeter, async (meter) => {
      await MonthMeterDataModel.findOneAndUpdate(
        { name: meter.name },
        {
          kwh: meter.kwh,
        }
      );
    });

    // APT Update
    const apt = await APTModel.findOne({ controlId });
    if (!apt)
      throw new ResponseError(StatusCodes.BAD_REQUEST, "잘못된 제어 입니다.");
    const { public: publicUsage } = apt.toObject();
    // 세대부 사용량 계산
    const householdPart = Math.round(
      _.sumBy(newMonthMeter, (meter) => meter.kwh!)
    );
    const publicPart = publicUsage + increasePublicUsage!;
    await apt.updateOne({
      $set: {
        apt: householdPart + publicPart,
        household: householdPart,
        public: publicPart,
      },
    });

    const newControlConfig = await ControlConfigModel.findOneAndUpdate(
      {
        _id: controlId,
      },
      {
        $set: {
          day: {
            ...day,
            now: now,
          },
        },
      },
      { new: true }
    );
    console.log(newControlConfig?.toObject());
    const token = generateToken(
      {
        control: newControlConfig?.toObject(),
      },
      "3d"
    );

    return res.status(StatusCodes.CREATED).json({
      token,
    });
  }
);

routes.patch(
  "/prev",
  loginCheck,
  controlCheck,
  async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const {
      _id: controlId,
      day,
      month,
      aptId,
      increasePublicUsage,
    } = req.control;
    console.log(req.control);
    let { now } = day;

    if (now <= 0)
      return next(
        new ResponseError(StatusCodes.BAD_REQUEST, "잘못된 제어 입니다.")
      );
    const dayMeter = await DayMeterDataModel.findOne({
      $and: [
        { $expr: { $eq: [{ $month: "$time" }, month] } },
        { $expr: { $eq: [{ $dayOfMonth: "$time" }, now] } },
      ],
    });
    const dayMeterDatas = dayMeter!.data;
    const monthMeter = await MonthMeterDataModel.find({});
    const newMonthMeter = _.map(dayMeterDatas, (meter) => {
      const _monthMeter = {
        ..._.find(monthMeter, { name: meter.name })?.toObject(),
      };
      _monthMeter.kwh! -= meter.kwh;
      return _monthMeter;
    });
    _.forEach(newMonthMeter, async (meter) => {
      await MonthMeterDataModel.findOneAndUpdate(
        { name: meter.name },
        {
          kwh: meter.kwh,
        }
      );
    });

    // APT Update
    const apt = await APTModel.findOne({ controlId });
    if (!apt)
      return next(
        new ResponseError(StatusCodes.BAD_REQUEST, "잘못된 제어 입니다.")
      );
    const { public: publicUsage } = apt.toObject();
    // 세대부 사용량 계산
    const householdPart = Math.round(
      _.sumBy(newMonthMeter, (meter) => meter.kwh!)
    );
    const publicPart = publicUsage - increasePublicUsage!;
    await apt.updateOne({
      $set: {
        apt: householdPart + publicPart,
        household: householdPart,
        public: publicPart,
      },
    });

    const newControlConfig = await ControlConfigModel.findOneAndUpdate(
      {
        _id: controlId,
      },
      {
        $set: {
          day: {
            ...day,
            now: --now,
          },
        },
      },
      { new: true }
    );
    const token = generateToken(
      {
        control: newControlConfig?.toObject(),
      },
      "3d"
    );

    return res.status(StatusCodes.CREATED).json({
      token,
    });
  }
);

export default routes;

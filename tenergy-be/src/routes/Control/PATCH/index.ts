import Express from "express";
import _ from "lodash";
import { StatusCodes } from "http-status-codes";
import { controlCheck, loginCheck } from "@mw";
import {
  APTModel,
  DayMeterDataModel,
  MonthMeterDataModel,
  ControlConfigModel,
  DistributorModel,
  HistoryModel,
  TradeModel,
} from "@models";
import { NUGIN_STEP, ResponseError } from "@common";
import { generateToken, getRole, monthToSeason } from "@utils";
import { Distributor, History, MonthMeterData } from "@models/types";
import { Socket } from "socket.io";

const routes: Express.Router = Express.Router();

routes.patch(
  "/next",
  loginCheck,
  controlCheck,
  async (req: Express.Request, res: Express.Response) => {
    const { _id: controlId, month, day, increasePublicUsage } = req.control;
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
    const newMonthMeter = await Promise.all(
      _.map(dayMeterDatas, async (meter) => {
        const _monthMeter = await MonthMeterData.getFromName(meter.name, month);

        _monthMeter!.kwh! += meter.kwh;

        // 적용전에 history 먼저넣기
        _monthMeter!.pushHistory(now);
        const role = getRole(_monthMeter!.kwh, month);
        return new MonthMeterData(
          _monthMeter!.name!,
          _monthMeter!.kwh!,
          role,
          month
        );
      })
    );

    _.forEach(newMonthMeter, async (meter) => {
      await MonthMeterDataModel.findOneAndUpdate(
        { name: meter.name },
        {
          kwh: meter.kwh,
          role: meter.role,
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

    // Distributor Update
    await DistributorModel.findOneAndUpdate(
      { controlId },
      {
        $set: await Distributor.update(),
      }
    );

    // History Update
    const buyerCount = _.filter(
      newMonthMeter,
      (meter) => meter.role === "buyer"
    ).length;
    const sellers = _.filter(newMonthMeter, (meter) => meter.role === "seller");
    const tradable = _.sumBy(
      sellers,
      (meter) => NUGIN_STEP[monthToSeason(month)][1] - meter.kwh
    );

    const history: History = {
      APT: [householdPart + publicPart],
      public: [publicPart],
      buyerCount: [buyerCount],
      sellerCount: [sellers.length],
      tradable: [tradable],
    };

    await HistoryModel.findOneAndUpdate(
      {
        controlId,
      },
      {
        $push: history,
      }
    );

    const io = req.app.get("io") as Socket;
    io.emit("change-control", "");

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
    const { _id: controlId, day, month, increasePublicUsage } = req.control;
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
      const role = getRole(_monthMeter.kwh!, month);
      return new MonthMeterData(
        _monthMeter.name!,
        _monthMeter.kwh!,
        role,
        month
      );
    });
    _.forEach(newMonthMeter, async (meter) => {
      await meter.popHistory(now);
      await MonthMeterDataModel.findOneAndUpdate(
        { name: meter.name },
        {
          kwh: meter.kwh,
          role: meter.role,
        }
      );
    });

    // TradeUpdate
    await TradeModel.deleteMany({ day: now });

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

    await DistributorModel.findOneAndUpdate(
      { controlId },
      {
        $set: await Distributor.update(),
      }
    );

    await HistoryModel.findOneAndUpdate(
      {
        controlId,
      },
      {
        $pop: {
          APT: 1,
          public: 1,
          buyerCount: 1,
          sellerCount: 1,
          tradable: 1,
        },
      }
    );

    const io = req.app.get("io") as Socket;
    io.emit("change-control", "");

    return res.status(StatusCodes.CREATED).json({
      token,
    });
  }
);

export default routes;

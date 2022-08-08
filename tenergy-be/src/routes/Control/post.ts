import Express from "express";
import { adminCheck } from "../../middlewares";
import { ControlConfig } from "../../models/ControlConfig/types";
import DayMeterDataModel from "../../models/DayMeterData";
import _ from "lodash";
import { DayMeterData, Household } from "../../models/DayMeterData/types";
import { getWholeUsages } from "../../utils";
import { APT } from "../../models/APT/types";
import APTModel from "../../models/APT";
import ControlConfigModel from "../../models/ControlConfig";
import { generateToken } from "../../utils/generateToken";
import { StatusCodes } from "http-status-codes";
import MonthMeterDataModel from "../../models/MonthMeterData";
import { MonthMeterData } from "../../models/MonthMeterData/types";

const routes: Express.Router = Express.Router();

routes.post(
  "/",
  adminCheck,
  async (req: Express.Request, res: Express.Response) => {
    const { month, publicPercentage } = req.body as ControlConfig;

    // 기본설정
    const dayMeter = await DayMeterDataModel.find({
      $expr: { $eq: [{ $month: "$time" }, month] },
    });
    const householdCount = dayMeter[0].data.length;
    const householdPart = Math.round(
      _.sumBy(dayMeter, (m: DayMeterData) =>
        _.sumBy(m.data, (h: Household) => h.kwh)
      )
    );
    const [apt, publicPart] = getWholeUsages(householdPart, publicPercentage);
    const increasePublicUsage = publicPart / dayMeter.length;

    // 전체 계산 (공용부 증가값 구하기)
    // 아까워서 놔둔다;;
    // const aptObj = new Household(
    //   "APT",
    //   Math.round(apt / householdCount),
    //   month
    // );
    // const households = _.groupBy(
    //   _.flatten(dayMeter.map((meter) => meter.data)),
    //   "name"
    // );
    // const householdsObj = _.map(
    //   households,
    //   (household, name) =>
    //     new Household(name, Math.round(_.sumBy(household, (h) => h.kwh)), month)
    // );

    // MonthMeterData 갱신
    const initHouseholds = _.map(
      _.sampleSize(dayMeter, 1)[0].data,
      (h: Household) => new MonthMeterData(h.name, 0, month)
    );
    _.forEach(initHouseholds, async (h) =>
      MonthMeterDataModel.findOneAndUpdate({ name: h.name }, h, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      })
    );

    // APT Cursor 생성
    const aptDoc: APT = {
      apt,
      household: 0,
      public: 0,
      householdCount,
    };
    const _aptDoc = await APTModel.create(aptDoc);

    // ControlConfig 생성
    const controlConfigDoc: ControlConfig = {
      month,
      publicPercentage,
      aptId: _aptDoc.id,
      increasePublicUsage,
      day: {
        now: 0,
        max: dayMeter.length,
      },
    };
    const _controlConfigDoc = await ControlConfigModel.create(controlConfigDoc);

    // 이제 이것을 JWT로 묶으면 됨
    const token = generateToken(
      {
        control: _controlConfigDoc.toObject(),
      },
      "3d"
    );

    return res.status(StatusCodes.CREATED).json({
      token,
    });
  }
);

export default routes;

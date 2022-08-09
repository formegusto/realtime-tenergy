import Express from "express";
import _ from "lodash";
import { StatusCodes } from "http-status-codes";
import { adminCheck } from "@mw";
import {
  ControlConfig,
  DayMeterData,
  AuthHousehold,
  APT,
  MonthMeterData,
  Distributor,
} from "@models/types";
import {
  DayMeterDataModel,
  APTModel,
  ControlConfigModel,
  MonthMeterDataModel,
  DistributorModel,
} from "@models";
import { getWholeUsages, generateToken } from "@utils";

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
        _.sumBy(m.data, (h: AuthHousehold) => h.kwh)
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
      (h: AuthHousehold) => new MonthMeterData(h.name, 0, month)
    );
    _.forEach(initHouseholds, async (h) =>
      MonthMeterDataModel.findOneAndUpdate({ name: h.name }, h, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      })
    );

    // ControlConfig 생성
    const controlConfigDoc: ControlConfig = {
      month,
      publicPercentage,
      increasePublicUsage,
      day: {
        now: 0,
        max: dayMeter.length,
      },
    };
    const _controlConfigDoc = await ControlConfigModel.create(controlConfigDoc);
    const control = _controlConfigDoc.toObject();
    const controlId = control._id;
    // APT Cursor 생성
    const aptDoc: APT = {
      apt: 0,
      household: 0,
      public: 0,
      householdCount,
      controlId,
    };
    await APTModel.create(aptDoc);
    // 이제 이것을 JWT로 묶으면 됨
    const token = generateToken(
      {
        control,
      },
      "3d"
    );

    // Distributor 생성
    // const distributor = {
    //   binRange: Distributor.generateBinValues(
    //     _.fill(_.sampleSize(dayMeter, 1)[0].data, 0)
    //   ),
    //   controlId,
    // };
    const distributor = new Distributor(
      _.fill(_.sampleSize(dayMeter, 1)[0].data, 0),
      controlId
    );
    await DistributorModel.create(distributor);

    return res.status(StatusCodes.CREATED).json({
      token,
    });
  }
);

export default routes;

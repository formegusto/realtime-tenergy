import Express from "express";
import _ from "lodash";
import { StatusCodes } from "http-status-codes";
import { adminCheck } from "@mw";
import {
  IControlConfig,
  DayMeterData,
  AuthHousehold,
  APT,
  MonthMeterData,
  Distributor,
  History,
} from "@models/types";
import {
  DayMeterDataModel,
  APTModel,
  ControlConfigModel,
  MonthMeterDataModel,
  DistributorModel,
  MonthMeterHistoryModel,
  HistoryModel,
} from "@models";
import { getWholeUsages, generateToken } from "@utils";

const routes: Express.Router = Express.Router();

routes.post(
  "/",
  adminCheck,
  async (req: Express.Request, res: Express.Response) => {
    const { month, publicPercentage } = req.body as IControlConfig;

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

    // MonthMeterData 갱신
    const initHouseholds = _.map(
      _.sampleSize(dayMeter, 1)[0].data,
      (h: AuthHousehold) => new MonthMeterData(h.name, 0, "seller", month)
    );
    _.forEach(initHouseholds, async (h) => {
      await MonthMeterHistoryModel.findOneAndUpdate(
        { name: h.name },
        {
          name: h.name,
          kwh: [
            {
              value: 0,
              day: 0,
            },
          ],
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );
      await MonthMeterDataModel.findOneAndUpdate({ name: h.name }, h, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      });
    });

    // ControlConfig 생성
    const controlConfigDoc: IControlConfig = {
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

    const distributor = new Distributor(
      _.fill(_.sampleSize(dayMeter, 1)[0].data, 0),
      controlId
    );
    await DistributorModel.create(distributor);

    // History 생성
    const history: History = {
      APT: [0],
      public: [0],
      buyerCount: [0],
      sellerCount: [householdCount],
      tradable: [0],

      controlId,
    };
    await HistoryModel.create(history);

    return res.status(StatusCodes.CREATED).json({
      token,
    });
  }
);

export default routes;

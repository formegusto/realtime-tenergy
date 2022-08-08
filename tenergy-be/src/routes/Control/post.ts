import Express from "express";
import { adminCheck } from "../../middlewares";
import { ControlConfig } from "../../models/ControlConfig/types";
import DayMeterDataModel from "../../models/DayMeterData";
import _ from "lodash";
import { DayMeterData, Household } from "../../models/DayMeterData/types";
import { getWholeUsages } from "../../utils";

const routes = Express.Router();

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

    const aptObj = new Household("APT", 412);
    console.log(aptObj.steps(month));

    return res.send("POST Control Config");
  }
);

export default routes;

import { connect } from "mongoose";
import { APTModel } from "./APT";
import { ControlConfigModel } from "./ControlConfig";
import { DistributorModel } from "./Distributor";
import { HistoryModel } from "./History";
import { MonthMeterDataModel } from "./MonthMeterData";
import { MonthMeterHistoryModel } from "./MonthMeterHistory";
import { TradeModel } from "./Trade";

type Props = {
  drop: boolean;
};

export async function dbConnect({ drop }: Props) {
  const { MONGO_HOST, MONGO_PORT, MONGO_APP } = process.env;
  const connectURL = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_APP}`;

  try {
    await connect(connectURL);

    if (drop) {
      await APTModel.deleteMany({});
      await ControlConfigModel.deleteMany({});
      await DistributorModel.deleteMany({});
      await MonthMeterDataModel.deleteMany({});
      await MonthMeterHistoryModel.deleteMany({});
      await HistoryModel.deleteMany({});
      await TradeModel.deleteMany({});
    }

    console.log("[mongoose] connected :)");
  } catch (err) {
    console.error("[mongoose] connect Error :(");
    console.error(err);
  }
}

export async function init(props: Props) {
  await dbConnect(props);
}

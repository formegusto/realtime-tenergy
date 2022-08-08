import { model, Schema } from "mongoose";
import { MonthMeterData } from "./types";

const MonthMeterDataSchema = new Schema<MonthMeterData>(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    kwh: { type: Number, required: true },
  },
  {
    timestamps: true,
    collection: "MonthMeterData",
  }
);

const MonthMeterDataModel = model<MonthMeterData>(
  "MonthMeterData",
  MonthMeterDataSchema
);
export default MonthMeterDataModel;

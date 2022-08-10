import { model, Schema } from "mongoose";
import { MonthMeterData } from "./types";

const MonthMeterDataSchema = new Schema<MonthMeterData>(
  {
    name: { type: String, required: true },
    kwh: { type: Number, required: true },
    role: { type: Schema.Types.String, required: true },
  },
  {
    timestamps: true,
    collection: "MonthMeterData",
  }
);

export const MonthMeterDataModel = model<MonthMeterData>(
  "MonthMeterData",
  MonthMeterDataSchema
);

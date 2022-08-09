import { model, Schema } from "mongoose";
import { DayMeterData } from "./types";

const DayMeterDataSchema = new Schema<DayMeterData>(
  {
    time: { type: Date, required: true },
    data: [{ type: Schema.Types.Mixed, required: true }],
  },
  {
    collection: "DayMeterData",
  }
);

export const DayMeterDataModel = model<DayMeterData>(
  "DayMeterData",
  DayMeterDataSchema
);

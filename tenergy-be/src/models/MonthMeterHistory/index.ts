import { model, Schema } from "mongoose";
import { MonthMeterHistory } from "./types";

const MonthMeterHistorySchema = new Schema<MonthMeterHistory>(
  {
    name: { type: Schema.Types.String, required: true },
    kwh: [{ type: Schema.Types.Number, required: true }],
  },
  {
    timestamps: true,
    collection: "MonthMeterHistory",
  }
);

export const MonthMeterHistoryModel = model<MonthMeterHistory>(
  "MonthMeterHistory",
  MonthMeterHistorySchema
);

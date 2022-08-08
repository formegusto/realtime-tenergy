import { Schema } from "mongoose";

export type MonthMeterData = {
  _id: Schema.Types.ObjectId;
  name: String;
  kwh: Number;
  createdAt: Date;
  updatedAt: Date;
};

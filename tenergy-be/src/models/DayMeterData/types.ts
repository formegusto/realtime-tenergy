import { Schema } from "mongoose";

export type Household = {
  name: String;
  kwh: Number;
};

export type DayMeterData = {
  _id: Schema.Types.ObjectId;
  time: Date;
  data: Household;
};

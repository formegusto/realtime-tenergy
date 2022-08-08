import { Schema } from "mongoose";

export type DayMeterData = {
  _id: Schema.Types.ObjectId;
  time: Date;
  data: Array<Household>;
};

export type Household = {
  name: string;
  kwh: number;
};

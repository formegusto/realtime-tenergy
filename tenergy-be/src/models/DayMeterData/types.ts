import { Schema } from "mongoose";

export type DayMeterData = {
  _id: Schema.Types.ObjectId;
  time: Date;
  data: Array<AuthHousehold>;
};

export type AuthHousehold = {
  name: string;
  kwh: number;
};

import { Schema } from "mongoose";

export type MonthMeterHistory = {
  _id?: Schema.Types.ObjectId;
  name: string;
  kwh: number[];

  createdAt?: Date;
  updatedAt?: Date;
};

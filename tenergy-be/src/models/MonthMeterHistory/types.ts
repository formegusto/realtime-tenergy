import { Schema } from "mongoose";

export type HistoryItem = {
  value: number;
  day: number;
};

export type MonthMeterHistory = {
  _id?: Schema.Types.ObjectId;
  name: string;
  kwh: HistoryItem[];

  createdAt?: Date;
  updatedAt?: Date;
};

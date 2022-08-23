import { Schema } from "mongoose";
import { TradingLabel } from "../types";

export type HistoryItem = {
  value: number;
  day: number;
  tradingLabel?: TradingLabel;
};

export type MonthMeterHistory = {
  _id?: Schema.Types.ObjectId;
  name: string;
  kwh: HistoryItem[];

  createdAt?: Date;
  updatedAt?: Date;
};

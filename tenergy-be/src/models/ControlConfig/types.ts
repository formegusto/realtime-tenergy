import { Schema } from "mongoose";

type Day = {
  now: number;
  max: number;
};

export type ControlConfig = {
  _id?: Schema.Types.ObjectId;
  month: number;
  publicPercentage: number;
  increasePublicUsage: number;
  day: Day;

  createdAt?: Date;
  updatedAt?: Date;
};

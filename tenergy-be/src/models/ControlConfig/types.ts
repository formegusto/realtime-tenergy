import { Schema } from "mongoose";

export type ControlConfig = {
  _id: Schema.Types.ObjectId;
  month: number;
  publicPercentage: number;
  aptId?: Schema.Types.ObjectId;
  increasePublicValue?: number;

  createdAt: Date;
  updatedAt: Date;
};

import { Schema } from "mongoose";

export type ControlConfig = {
  _id: Schema.Types.ObjectId;
  month: Number;
  publicPercentage: Number;
  aptId?: Schema.Types.ObjectId;
  increasePublicValue?: Number;

  createdAt: Date;
  updatedAt: Date;
};

import { Schema } from "mongoose";

export type Household = {
  _id: Schema.Types.ObjectId;
  name: String;
  createdAt: Date;
};

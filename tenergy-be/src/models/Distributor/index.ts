import { Schema } from "mongoose";
import { Distributor } from "./types";

const DistributorSchema = new Schema<Distributor>({
  _id: { type: Schema.Types.ObjectId },
  binValues: [{ type: Schema.Types.Number, required: true }],

  createdAt: { type: Date },
  updatedAt: { type: Date },
});

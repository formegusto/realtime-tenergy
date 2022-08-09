import { model, Schema } from "mongoose";
import { Distributor } from "./types";

const DistributorSchema = new Schema<Distributor>(
  {
    binValues: [{ type: Schema.Types.Number, required: true }],
    controlId: { type: Schema.Types.ObjectId, required: true },
  },
  {
    collection: "Distributor",
    timestamps: true,
  }
);

export const DistributorModel = model<Distributor>(
  "Distributor",
  DistributorSchema
);

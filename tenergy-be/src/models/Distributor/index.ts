import { model, Schema } from "mongoose";
import { Distributor } from "./types";

const DistributorSchema = new Schema<Distributor>(
  {
    _id: { type: Schema.Types.ObjectId },
    binValues: [{ type: Schema.Types.Number, required: true }],
    createdAt: { type: Date },
    updatedAt: { type: Date },
    controlId: { type: Schema.Types.Number, required: true },
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

import { model, Schema } from "mongoose";
import { APT } from "./types";

const APTSchema = new Schema<APT>(
  {
    apt: { type: Number, required: true },
    household: { type: Number, required: true },
    public: { type: Number, required: true },
    householdCount: { type: Number, required: true },
    controlId: { type: Schema.Types.ObjectId, required: true },
  },
  {
    collection: "APT",
    timestamps: true,
  }
);

export const APTModel = model<APT>("APT", APTSchema);

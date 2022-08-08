import { model, Schema } from "mongoose";
import { APT } from "./types";

const APTSchema = new Schema<APT>(
  {
    apt: { type: Number, required: true },
    household: { type: Number, required: true },
    public: { type: Number, required: true },
    householdCount: { type: Number, required: true },
  },
  {
    collection: "APT",
    timestamps: true,
  }
);

const APTModel = model<APT>("APT", APTSchema);
export default APTModel;

import { model, Schema } from "mongoose";
import { ControlConfig } from "./types";

const ControlConfigSchema = new Schema<ControlConfig>(
  {
    month: { type: Number, required: true },
    publicPercentage: { type: Number, required: true },
    aptId: { type: Schema.Types.ObjectId, required: true },
    increasePublicUsage: { type: Number, required: true },
    day: { type: Schema.Types.Mixed, required: true },
  },
  {
    collection: "ControlConfig",
    timestamps: true,
  }
);

const ControlConfigModel = model<ControlConfig>(
  "ControlConfig",
  ControlConfigSchema
);
export default ControlConfigModel;

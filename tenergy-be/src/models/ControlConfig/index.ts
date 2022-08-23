import { model, Schema } from "mongoose";
import { IControlConfig } from "./types";

const ControlConfigSchema = new Schema<IControlConfig>(
  {
    month: { type: Number, required: true },
    publicPercentage: { type: Number, required: true },
    increasePublicUsage: { type: Number, required: true },
    day: { type: Schema.Types.Mixed, required: true },
  },
  {
    collection: "ControlConfig",
    timestamps: true,
  }
);

export const ControlConfigModel = model<IControlConfig>(
  "ControlConfig",
  ControlConfigSchema
);

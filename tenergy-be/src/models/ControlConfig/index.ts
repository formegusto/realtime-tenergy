import { model, Schema } from "mongoose";
import { ControlConfig } from "./types";

const ControlConfigSchema = new Schema<ControlConfig>(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    month: { type: Number, required: true },
    publicPercentage: { type: Number, required: true },
    aptId: { type: Schema.Types.ObjectId },
    increasePublicValue: { type: Number },
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

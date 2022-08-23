import { model, Schema } from "mongoose";
import { ITrade } from "./types";

const TradeSchema = new Schema<ITrade>(
  {
    requester: { type: String, required: true },
    responser: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: {
      type: String,
      enum: ["request", "reject", "establish", "cancle"],
      default: "request",
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "Trade",
    timestamps: true,
  }
);

export const TradeModel = model<ITrade>("Trace", TradeSchema);

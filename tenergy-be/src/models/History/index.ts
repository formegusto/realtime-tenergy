import { model, Schema } from "mongoose";
import { History } from "./types";

const HistorySchema = new Schema<History>(
  {
    APT: [{ type: Schema.Types.Number, required: true }],
    public: [{ type: Schema.Types.Number, required: true }],
    buyerCount: [{ type: Schema.Types.Number, required: true }],
    sellerCount: [{ type: Schema.Types.Number, required: true }],
    tradable: [{ type: Schema.Types.Number, required: true }],
    controlId: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    collection: "History",
  }
);

export const HistoryModel = model<History>("History", HistorySchema);

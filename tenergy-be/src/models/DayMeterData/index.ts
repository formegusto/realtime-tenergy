import { model, Schema } from "mongoose";
import { DayMeterData } from "./types";

const DayMeterDataSchema = new Schema<DayMeterData>(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    time: { type: Date, required: true },
    data: { type: Schema.Types.Array, required: true },
  },
  {
    collection: "DayMeterData",
  }
);

const DayMeterDataModel = model<DayMeterData>(
  "DayMeterData",
  DayMeterDataSchema
);
export default DayMeterDataModel;

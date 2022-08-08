import { Schema, model } from "mongoose";
import { Household } from "./types";

const HouseholdSchema = new Schema<Household>(
  {
    name: { type: String, required: true },
    createdAt: { type: Date, required: true },
  },
  {
    collection: "Household",
  }
);

const HouseholdModel = model<Household>("Household", HouseholdSchema);
export default HouseholdModel;

import { Schema } from "mongoose";

export class Household {
  name!: string;
  kwh!: number;

  constructor(name: string, kwh: number) {
    this.name = name;
    this.kwh = kwh;
  }

  steps(month: number): Array<number> {
    return [0, 0, 0];
  }
}

export type DayMeterData = {
  _id: Schema.Types.ObjectId;
  time: Date;
  data: Array<Household>;
};

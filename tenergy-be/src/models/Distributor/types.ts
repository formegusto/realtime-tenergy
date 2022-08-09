import { histogram } from "@utils";
import { Schema } from "mongoose";
import { MonthMeterDataModel } from "../MonthMeterData";
import _ from "lodash";

export class Distributor {
  _id!: Schema.Types.ObjectId;

  binValues: Array<number>;

  createdAt!: Date;
  updatedAt!: Date;

  controlId!: Schema.Types.ObjectId;

  constructor(datas: Array<number>, controlId?: any) {
    this.binValues = histogram(datas);
    this.controlId = controlId;
  }

  static update = async () => {
    const monthMeterData = await MonthMeterDataModel.find(
      {},
      { kwh: 1, _id: 0 }
    );

    console.log(new Distributor(_.map(monthMeterData, (meter) => meter.kwh)));

    return new Distributor(_.map(monthMeterData, (meter) => meter.kwh));
  };

  static generateBinValues = (datas: Array<number>) => histogram(datas);
}

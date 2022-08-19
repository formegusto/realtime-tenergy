import { histogram } from "@utils";
import { Schema } from "mongoose";
import { MonthMeterDataModel } from "../MonthMeterData";
import _ from "lodash";
import { MixedData, MixedDataBuilder } from "../MixedData";

export class Distributor {
  _id!: Schema.Types.ObjectId;

  binValues: Array<number>;

  createdAt!: Date;
  updatedAt!: Date;

  controlId!: Schema.Types.ObjectId;

  mixedBuilder?: MixedDataBuilder;
  mixedData?: MixedData;

  constructor(datas: Array<number> | null, controlId?: any) {
    this.binValues = datas ? histogram(datas) : [];
    this.controlId = controlId;
  }

  static getFromDocs(document: Distributor) {
    const distributor = new Distributor(null, document.controlId);
    distributor.binValues = document.binValues;
    distributor.mixedBuilder = new MixedDataBuilder();

    return distributor;
  }

  async setMixedData(aptUsage: number, month: number) {
    this.mixedData = (await this.mixedBuilder!.step1(month))
      .step2(aptUsage, month)
      .get();
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

  get contributions() {
    const contRange = _.range(1, this.binValues.length);
    const medians = _.map(
      contRange,
      (idx) => (this.binValues[idx] + this.binValues[idx - 1]) / 2
    );
    const medianTotal = _.sum(medians);
    const contributions = _.map(medians, (median) => median / medianTotal);

    return contributions;
  }
}

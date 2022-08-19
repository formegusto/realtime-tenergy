import { MonthMeterDataModel } from "../MonthMeterData";
import { MonthMeterData } from "../types";
import _ from "lodash";

// Builder Pattern 적용
export class MixedData {
  apt?: MonthMeterData;
  households?: MonthMeterData[];

  get aptPrice() {
    return this.apt!.bill * this.households!.length;
  }

  get householdsPrice() {
    return _.sumBy(this.households, (household) => household.bill);
  }

  get publicPrice() {
    return this.aptPrice - this.householdsPrice;
  }
}

export class MixedDataBuilder {
  mix: MixedData;

  constructor() {
    this.mix = new MixedData();
  }

  // set households
  async step1(month: number) {
    const _monthMeterData = await MonthMeterDataModel.find(
      {},
      { _id: 0, name: 1, kwh: 1, role: 1 }
    );
    const monthMeterData = _.map(_monthMeterData, (meter) =>
      MonthMeterData.getFromDocument(meter, month)
    );

    this.mix.households = monthMeterData;
  }

  // set APT()
  step2(aptUsage: number, month: number) {
    this.mix.apt = new MonthMeterData(
      "APT",
      aptUsage / this.mix.households!.length,
      month,
      "seller"
    );
  }

  get() {
    return this.mix;
  }
}

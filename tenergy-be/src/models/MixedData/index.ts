import { MonthMeterDataModel } from "../MonthMeterData";
import { Distributor, MonthMeterData } from "../types";
import _ from "lodash";
import { DistributorModel } from "../Distributor";
import { MonthMeterHistoryModel } from "../MonthMeterHistory";
import { getRole } from "@utils";
import { HistoryModel } from "../History";

// Builder Pattern 적용
export class MixedData {
  apt?: MonthMeterData;
  households?: MonthMeterData[];
  household?: MonthMeterData;
  distributor?: Distributor;

  get aptPrice() {
    return this.apt!.bill * this.households!.length;
  }

  get householdsPrice() {
    return _.sumBy(this.households, (household) => household.bill);
  }

  get publicPrice() {
    return this.aptPrice - this.householdsPrice;
  }

  get householdDistribution() {
    const table = this.distributor!.table;
    console.log(table);

    const checkBins = _.dropRight(this.distributor!.binValues);
    const groupNum = _.filter(
      checkBins,
      (bin) => bin < this.household!.kwh
    ).length;

    return _.find(table, (t) => t.groupNo === groupNum);
  }
}

export class MixedDataBuilder {
  private _prev: number;
  mix: MixedData;

  set prev(prev: number) {
    this._prev = prev - 1;
  }

  get prev() {
    return this._prev;
  }

  constructor(prev?: number) {
    this._prev = prev ? prev - 1 : -1;
    this.mix = new MixedData();
  }

  // set households
  // prev == 전날이면 -1 => 실제 쿼리는 -2로
  async step1(month: number) {
    const _monthMeterData = await MonthMeterHistoryModel.find(
      {},
      { _id: 0, name: 1, kwh: { $slice: this.prev } }
    );
    // console.log(_monthMeterData);
    const monthMeterData = _.map(
      _monthMeterData,
      (meter) =>
        new MonthMeterData(
          meter.name,
          meter.kwh[0],
          month,
          getRole(meter.kwh[0], month)
        )
    );

    this.mix.households = monthMeterData;
    return this;
  }

  // set APT()
  step2(aptUsage: number, month: number) {
    this.mix.apt = new MonthMeterData(
      "APT",
      aptUsage / this.mix.households!.length,
      month,
      "seller"
    );
    return this;
  }

  // set APT with history
  async step2_ex(controlId: any, month: number) {
    const history = await HistoryModel.findOne(
      { controlId },
      {
        _id: 1,
        APT: { $slice: this.prev },
      }
    );
    this.mix.apt = new MonthMeterData(
      "APT",
      history!.APT[0] / this.mix.households!.length,
      month,
      "seller"
    );
    return this;
  }

  // set household, monthMeterData
  async step3(name: string) {
    const meterData = await MonthMeterDataModel.findOne(
      {
        name,
      },
      { name: 1, kwh: 1 }
    );
    this.mix.household = meterData!;
    return this;
  }

  // set distributor
  async step4(controlId: string) {
    const distributorDocs = await DistributorModel.findOne({
      controlId: controlId,
    });
    this.mix.distributor = Distributor.getFromDocs(distributorDocs!);
    return this;
  }

  get() {
    return this.mix;
  }
}

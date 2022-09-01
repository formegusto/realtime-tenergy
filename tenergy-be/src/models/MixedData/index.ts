import { MonthMeterDataModel } from "../MonthMeterData";
import {
  Distributor,
  MonthMeterData,
  IControlConfig,
  Trade,
  ControlConfig,
} from "../types";
import _ from "lodash";
import { DistributorModel } from "../Distributor";
import { MonthMeterHistoryModel } from "../MonthMeterHistory";
import { demandFunction, getRole } from "@utils";
import { HistoryModel } from "../History";
import { TradeModel } from "../Trade";

// Builder Pattern 적용
export class MixedData {
  apt?: MonthMeterData;
  households?: MonthMeterData[];
  household?: MonthMeterData;
  distributor?: Distributor;
  trades?: Trade[];

  get aptPrice() {
    return this.apt!.bill * this.households!.length;
  }

  async householdsPrice() {
    const meterDataDocs = await MonthMeterDataModel.find({});
    const meterDatas = _.map(meterDataDocs, (meter) =>
      MonthMeterData.getFromDocument(meter)
    );
    const tradeMargins = await Promise.all(
      _.map(meterDatas, async (household) => await household.tradeMargin())
    );
    _.forEach(meterDatas, (household) =>
      console.log(household.kwh, household.bill)
    );
    return (
      _.sumBy(meterDatas, (household) => household.bill) - _.sum(tradeMargins)
    );
  }

  async publicPrice() {
    const householdsPrice = await this.householdsPrice();

    return this.aptPrice - householdsPrice;
  }

  async tradePrice() {
    const meterDataDocs = await MonthMeterDataModel.find({});
    const meterDatas = _.map(meterDataDocs, (meter) =>
      MonthMeterData.getFromDocument(meter)
    );
    const tradeMargins = await Promise.all(
      _.map(meterDatas, async (household) => await household.tradeMargin())
    );
    console.log("trade margins", tradeMargins);

    return _.sum(tradeMargins);
  }

  get householdDistribution() {
    const table = this.distributor!.table;

    const checkBins = _.dropRight(this.distributor!.binValues);
    const groupNum = _.filter(
      checkBins,
      (bin) => bin < this.household!.kwh
    ).length;
    console.log(this.household!.kwh, groupNum, table);

    return _.find(table, (t) => t.groupNo === groupNum);
  }

  async houesholdIntegratedBill() {
    const controlConfig = await ControlConfig.getRecently();
    const householdDistribution = this.householdDistribution;

    const basicPrice = this.household!.basic;
    const elecRatePrice = this.household!.elecRate;
    const householdPrice = basicPrice + elecRatePrice;
    const publicPrice = householdDistribution!.price;
    const tradeReqCount = _.filter(
      this.trades!,
      ({ status, responser }) =>
        status === "request" && responser === this.household!.name
    ).length;

    // tradePrice
    // buyer일 경우
    let tradePrice = await this.household!.tradeMargin();
    const bill = householdPrice + publicPrice - tradePrice;

    return {
      meter: {
        kwh: this.household!.kwh,
        step: this.household!.step + 1,
      },
      price: {
        basicPrice,
        elecRatePrice,
        householdPrice,
        publicPrice,
        tradeReqCount,
        tradePrice,
        bill,
      },
      distribution: householdDistribution,
    };
  }
}

export class MixedDataBuilder {
  private _prev: number;
  mix: MixedData;
  month?: number;

  // autoSet
  async set(control: IControlConfig, name: string) {
    await this.step1(control.month);
    await this.step2_ex(control._id, control.month);
    await this.step3(name);
    await this.step4(control._id as any);
    await this.step5();
  }

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
    this.month = month;

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
          meter.kwh[0].value,
          getRole(meter.kwh[0].value, month),
          month
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
      "seller",
      month
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
      "seller",
      month
    );
    return this;
  }

  // set household, monthMeterData
  async step3(name: string) {
    const meterData = await MonthMeterDataModel.findOne(
      {
        name,
      },
      { name: 1, kwh: 1, role: 1 }
    );
    this.mix.household = MonthMeterData.getFromDocument(
      meterData!,
      this.month!
    );
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

  // trades setting
  async step5() {
    const trades = await TradeModel.find(
      {
        $or: [
          { requester: this.mix.household?.name },
          { responser: this.mix.household?.name },
        ],
      },
      {},
      { sort: { updatedAt: 1 } }
    );
    this.mix.trades = trades;
    return this;
  }

  get() {
    return this.mix;
  }
}

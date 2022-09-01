import { histogram } from "@utils";
import { Schema } from "mongoose";
import { MonthMeterDataModel } from "../MonthMeterData";
import _ from "lodash";
import { MixedData, MixedDataBuilder } from "../MixedData";
import { MonthMeterData } from "../types";
import { TradeModel } from "../Trade";

export class Distributor {
  _id!: Schema.Types.ObjectId;

  binValues: Array<number>;
  households?: MonthMeterData[];

  createdAt!: Date;
  updatedAt!: Date;

  controlId!: Schema.Types.ObjectId;

  mixedBuilder?: MixedDataBuilder;
  mixedData?: MixedData;

  publicPrice?: number;

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

  async setHouseholds() {
    this.households = await MonthMeterDataModel.find();

    // trade 결과가 있는 seller들은 trade 사용량 적용
    const sellers = _.filter(this.households, ({ role }) => role === "seller");
    const sellerNames = _.map(sellers, ({ name }) => name);

    const sellerTrades = await TradeModel.find({
      $or: [
        { requester: { $in: sellerNames } },
        { responser: { $in: sellerNames } },
      ],
    });

    // 적용
    _.forEach(sellerTrades, (sellerTrade) => {
      const idx = _.findIndex(
        this.households,
        ({ name }) =>
          sellerNames.includes(name) &&
          (sellerTrade.requester === name || sellerTrade.responser === name)
      );
      console.log(this.households![idx]);
      this.households![idx].kwh += sellerTrades[idx].quantity;
      console.log(this.households![idx]);
    });
  }

  async setMixedData(aptUsage: number, month: number) {
    this.mixedData = (await this.mixedBuilder!.step1(month))
      .step2(aptUsage, month)
      .get();
    this.publicPrice = await this.mixedData!.publicPrice();
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
  get histInfo() {
    const histSizeBins = _.dropRight(this.binValues);
    const histInfo = _.fill(new Array(this.binValues.length - 1), 0);
    _.forEach(this.households!, ({ kwh }) => {
      const idx = _.filter(histSizeBins, (bin) => bin < kwh).length;

      histInfo[idx - 1]++;
    });

    return histInfo;
  }

  get priPrice() {
    return this.publicPrice! / this.mixedData!.households!.length;
  }

  get groupPrice() {
    const groupContributionPrices = _.map(
      this.contributions,
      (contribution) => this.priPrice * contribution
    );
    const totalContributionPrice = _.sum(
      _.map(_.zip(this.histInfo, groupContributionPrices), (v) =>
        _.multiply.apply(null, v as any)
      )
    );
    const errPriPrice =
      (this.publicPrice! - totalContributionPrice) / this.households!.length;
    const groupPrice = _.map(
      groupContributionPrices,
      (contPrice) => contPrice + errPriPrice
    );

    return groupPrice;
  }

  get errGroupPrice() {
    return _.map(this.groupPrice, (gPrice) => gPrice - this.priPrice);
  }

  get table() {
    const contributions = this.contributions;
    const groupPrice = this.groupPrice;
    const errGroupPrice = this.errGroupPrice;
    const groupRange = _.range(1, this.binValues.length);

    return _.map(groupRange, (groupNo, idx) =>
      _.zipObject(
        ["groupNo", "contribute", "price", "err"],
        [
          groupNo,
          Math.round(contributions[idx] * 100) / 100,
          Math.round(groupPrice[idx]),
          Math.round(errGroupPrice[idx]),
        ]
      )
    );
  }
}

export type Distribution = {
  groupNo: number;
  contribute: number;
  price: number;
  err: number;
};

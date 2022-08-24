import { Schema } from "mongoose";
import { BASIC, ELECRATE, NUGIN_ERR, NUGIN_STEP } from "../../common";
import { demandFunction, monthToSeason } from "../../utils";
import _ from "lodash";
import { MonthMeterHistoryModel } from "../MonthMeterHistory";
import { MonthMeterDataModel } from ".";
import { TradingLabel } from "../types";
import { TradeModel } from "../Trade";
import { cancleTrade } from "./utils";

export class MonthMeterData {
  // mongo data
  _id!: Schema.Types.ObjectId;
  name!: string;
  kwh!: number;
  role!: "buyer" | "seller";

  createdAt!: Date;
  updatedAt!: Date;

  month?: number;
  tradeQuantity?: number;
  tradePrice: number;

  constructor(
    name: string,
    kwh: number,
    role: "buyer" | "seller",
    month?: number
  ) {
    this.name = name;
    this.kwh = kwh;
    this.role = role;
    this.month = month ? month : 1;
    this.tradePrice = 0;
  }

  static getFromDocument(document: MonthMeterData, month?: number) {
    return new MonthMeterData(
      document.name,
      document.kwh,
      document.role,
      month
    );
  }

  static async getFromName(name: string, month?: number) {
    const monthMeterDataDocs = await MonthMeterDataModel.findOne({ name });
    if (monthMeterDataDocs)
      return this.getFromDocument(monthMeterDataDocs, month);
  }

  get tradeUsage() {
    if (!this.tradeQuantity) return this.kwh + 0;
    else
      return (
        this.kwh +
        (this.role === "seller" ? this.tradeQuantity : this.tradeQuantity * -1)
      );
  }

  get tradeObj() {
    return new MonthMeterData(
      this.name,
      this.tradeUsage,
      this.role,
      this.month
    );
  }

  get steps(): Array<number> {
    // 1. 각 단계별 차이를 구한다.
    let steps = _.map(
      NUGIN_STEP[monthToSeason(this.month!)],
      (v) => this.kwh - v
    );
    // console.log(steps);

    // 2. 각 단계별 오차보다 큰지 확인한다. 작으면 해당 단계의 가구이다.
    steps = _.map(steps, (v, idx) =>
      v < NUGIN_ERR[monthToSeason(this.month!)][idx]
        ? v
        : NUGIN_ERR[monthToSeason(this.month!)][idx]
    );
    // console.log(steps);

    // 3. 0을 걸러준다.
    steps = _.map(steps, (v) => (v > 0 ? v : 0));
    // console.log(steps);

    return steps;
  }

  async tradeMargins() {
    const trades = await TradeModel.find(
      {
        $or: [{ requester: this.name }, { responser: this.name }],
        status: "establish",
      },
      {},
      { sort: { updatedAt: 1 } }
    );
    if (trades.length === 0) return [];

    let demands: number[];
    let tradeMargin = 0;
    if (this.role === "buyer") {
      let kwh = this.kwh;
      this.tradeQuantity = _.sumBy(trades, ({ quantity }) => quantity);
      const tradeBuyer = this.tradeObj;

      demands = _.map(trades, ({ quantity, updatedAt }) => {
        const _kwh = kwh;
        kwh -= quantity;
        console.log("quantity", quantity, updatedAt);
        return demandFunction(_kwh, quantity, this.month!);
      });
      console.log("buyer demands", demands);

      tradeBuyer.tradePrice = _.sum(demands);
      const tradeBill = tradeBuyer.bill;

      tradeMargin = this.bill - tradeBill;
    } else {
      this.tradeQuantity = _.sumBy(trades, ({ quantity }) => quantity);
      const tradeSeller = this.tradeObj;

      demands = await Promise.all(
        _.map(trades, async ({ requester, responser, updatedAt, quantity }) => {
          const buyerName = requester === this.name ? responser : requester;
          const buyer = await MonthMeterDataModel.findOne({
            name: buyerName,
          });
          let buyerUsage = buyer!.kwh;

          // 나보다 앞 순의 거래들
          const otherTradeList = await TradeModel.find({
            updatedAt: { $lt: updatedAt },
            status: "establish",
          });
          const otherTradeSum = _.sumBy(
            otherTradeList,
            ({ quantity }) => quantity
          );
          console.log("other trade sum", otherTradeSum);
          // 거래를 모두 진행한 내 차례때의 사용량
          buyerUsage -= otherTradeSum;
          console.log("real buyer usage", buyerUsage);
          const demand = demandFunction(buyerUsage, quantity, this.month!);

          return demand;
        })
      );

      console.log("seller demands", demands);

      console.log(_.sum(demands));
      console.log(this.bill, tradeSeller.bill);
      tradeSeller.tradePrice = _.sum(demands) * -1;

      tradeMargin = this.bill - tradeSeller.bill;
    }

    const tradeMargins = _.map(trades, ({ _id, quantity }, idx) => ({
      _id,
      quantity,
      price: demands[idx],
    }));

    return tradeMargins;
  }

  async tradeMargin() {
    const trades = await TradeModel.find(
      {
        $or: [{ requester: this.name }, { responser: this.name }],
        status: "establish",
      },
      {},
      { sort: { updatedAt: 1 } }
    );
    if (trades.length === 0) return 0;

    let tradeMargin = 0;
    if (this.role === "buyer") {
      let kwh = this.kwh;
      this.tradeQuantity = _.sumBy(trades, ({ quantity }) => quantity);
      const tradeBuyer = this.tradeObj;

      const demands = _.map(trades, ({ quantity, updatedAt }) => {
        const _kwh = kwh;
        kwh -= quantity;
        console.log("quantity", quantity, updatedAt);
        return demandFunction(_kwh, quantity, this.month!);
      });
      console.log("buyer demands", demands);

      tradeBuyer.tradePrice = _.sum(demands);
      const tradeBill = tradeBuyer.bill;

      tradeMargin = this.bill - tradeBill;
    } else {
      this.tradeQuantity = _.sumBy(trades, ({ quantity }) => quantity);
      const tradeSeller = this.tradeObj;

      const demands: Array<number> = await Promise.all(
        _.map(trades, async ({ requester, responser, updatedAt, quantity }) => {
          const buyerName = requester === this.name ? responser : requester;
          const buyer = await MonthMeterDataModel.findOne({
            name: buyerName,
          });
          let buyerUsage = buyer!.kwh;

          // 나보다 앞 순의 거래들
          const otherTradeList = await TradeModel.find({
            updatedAt: { $lt: updatedAt },
            status: "establish",
          });
          const otherTradeSum = _.sumBy(
            otherTradeList,
            ({ quantity }) => quantity
          );
          console.log("other trade sum", otherTradeSum);
          // 거래를 모두 진행한 내 차례때의 사용량
          buyerUsage -= otherTradeSum;
          console.log("real buyer usage", buyerUsage);
          const demand = demandFunction(buyerUsage, quantity, this.month!);

          return demand;
        })
      );

      console.log("seller demands", demands);

      console.log(_.sum(demands));
      console.log(this.bill, tradeSeller.bill);
      tradeSeller.tradePrice = _.sum(demands) * -1;

      tradeMargin = this.bill - tradeSeller.bill;
    }

    return tradeMargin;
  }

  get step(): number {
    return _.findLastIndex(this.steps, (v) => v !== 0);
  }

  get basic(): number {
    return BASIC[this.step];
  }

  get elecRate(): number {
    const steps = this.steps;

    return Math.round(
      _.reduce(
        ELECRATE,
        (acc: number, rate: number, idx: number) => acc + rate * steps[idx],
        0
      )
    );
  }

  get bill(): number {
    return this.basic + this.elecRate + this.tradePrice;
  }

  async pushHistory(day: number, tradingLabel?: TradingLabel) {
    const trades = await TradeModel.find({
      $or: [
        {
          requester: this.name,
        },
        {
          responser: this.name,
        },
      ],
      status: "establish",
    });
    let totalQuantity = _.sumBy(trades, ({ quantity }) => quantity);

    if (
      this.role === "seller" &&
      totalQuantity !== 0 &&
      Math.round(this.kwh + totalQuantity) >=
        NUGIN_ERR[monthToSeason(this.month!)][0]
    ) {
      // 취소 시켜야함
      const err =
        Math.round(this.kwh + totalQuantity) -
        NUGIN_ERR[monthToSeason(this.month!)][0];
      totalQuantity = await cancleTrade(this.name, err, this.month!);
    }

    await MonthMeterHistoryModel.findOneAndUpdate(
      { name: this.name },
      {
        $push: {
          kwh: {
            value:
              this.kwh +
              (tradingLabel
                ? 0
                : this.role === "buyer"
                ? totalQuantity * -1
                : totalQuantity),
            day,
            ...(tradingLabel ? { tradingLabel } : {}),
          },
        },
      },
      {
        new: true,
      }
    );
  }

  async popHistory(day: number) {
    // 음수면 shift, 양수면 pop
    await MonthMeterHistoryModel.findOneAndUpdate(
      { name: this.name },
      {
        $pull: { kwh: { day } },
      },
      {
        new: true,
      }
    );
  }
}

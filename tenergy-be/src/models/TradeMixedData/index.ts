import { MonthMeterHistoryModel } from "../MonthMeterHistory";
import { MonthMeterData } from "../types";

export class TradeMixedData {
  id?: string;
  quantity: number;

  requester?: MonthMeterData;
  responser?: MonthMeterData;

  constructor(quantity: number, id?: string) {
    this.id = id;
    this.quantity = quantity;
  }

  async init(requester: string, responser: string) {
    this.requester = await MonthMeterData.getFromName(requester);

    if (this.requester) {
      const recentlyKwh = await MonthMeterHistoryModel.findOne(
        {
          name: requester,
        },
        {
          kwh: { $slice: -1 },
        }
      );
      this.requester!.kwh = recentlyKwh!.kwh[0].value;
    }

    this.responser = await MonthMeterData.getFromName(responser);
    if (this.responser) {
      const recentlyKwh = await MonthMeterHistoryModel.findOne(
        {
          name: responser,
        },
        {
          kwh: { $slice: -1 },
        }
      );
      this.responser!.kwh = recentlyKwh!.kwh[0].value;
    }
  }

  get buyer() {
    return this.requester!.role === "buyer" ? this.requester! : this.responser!;
  }

  get seller() {
    return this.responser!.role === "seller"
      ? this.responser!
      : this.requester!;
  }

  get tradeBuyer() {
    const buyer = this.buyer;
    buyer.tradeQuantity = this.quantity;

    return buyer.tradeObj;
  }

  get tradeSeller() {
    const seller = this.seller;
    seller.tradeQuantity = this.quantity;

    return seller.tradeObj;
  }

  async pushHistory(day: number) {
    if (this.id) {
      this.tradeBuyer.pushHistory(day, { id: this.id });
      this.tradeSeller.pushHistory(day, { id: this.id });
    }
  }
}

export class TradeMixedDataBuilder {
  tmd: TradeMixedData;

  constructor(quantity: number, id?: string) {
    this.tmd = new TradeMixedData(quantity, id);
  }

  async step1(requester: string, responser: string) {
    await this.tmd.init(requester, responser);
  }

  get() {
    return this.tmd;
  }
}

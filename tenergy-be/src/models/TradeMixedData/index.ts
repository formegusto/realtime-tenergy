import { MonthMeterData } from "../types";

export class TradeMixedData {
  id: string;
  quantity: number;

  requester?: MonthMeterData;
  responser?: MonthMeterData;

  constructor(id: string, quantity: number) {
    this.id = id;
    this.quantity = quantity;
  }

  async init(requester: string, responser: string) {
    this.requester = await MonthMeterData.getFromName(requester);
    this.responser = await MonthMeterData.getFromName(responser);
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
    this.buyer.pushHistory(day, { id: this.id });
    this.seller.pushHistory(day, { id: this.id });
  }
}

export class TradeMixedDataBuilder {
  tmd: TradeMixedData;

  constructor(id: string, quantity: number) {
    this.tmd = new TradeMixedData(id, quantity);
  }

  async step1(requester: string, responser: string) {
    await this.tmd.init(requester, responser);
  }

  get() {
    return this.tmd;
  }
}

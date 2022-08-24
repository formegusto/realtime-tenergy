import { Schema } from "mongoose";
import { MonthMeterData } from "../types";

export type TradingLabel = {
  id: string;
};

export type TradeStatus = "request" | "reject" | "establish" | "cancle";

export interface ITrade {
  id: Schema.Types.ObjectId;

  requester: string;
  responser: string;
  quantity: number;
  status: TradeStatus;
  day: number;

  createdAt: Date;
  updatedAt: Date;
}

export class Trade implements ITrade {
  id!: Schema.Types.ObjectId;

  requester: string;
  responser: string;
  quantity: number;
  status: TradeStatus;
  day: number;

  createdAt!: Date;
  updatedAt!: Date;

  constructor(
    requester: string,
    responser: string,
    quantity: number,
    status: TradeStatus,
    day: number
  ) {
    this.requester = requester;
    this.responser = responser;
    this.quantity = quantity;
    this.status = status;
    this.day = day;
  }
}

export class AdvancedTrade {
  id!: string;

  requester: MonthMeterData;
  responser: MonthMeterData;
  quantity: number;
  status: TradeStatus;
  day: number;

  createdAt!: Date;
  updatedAt!: Date;

  constructor(
    id: string,
    requester: MonthMeterData,
    responser: MonthMeterData,
    quantity: number,
    status: TradeStatus,
    day: number
  ) {
    this.id = id;
    this.requester = requester;
    this.responser = responser;
    this.quantity = quantity;
    this.status = status;
    this.day = day;
  }

  static async get(trade: Trade) {
    const requester = await MonthMeterData.getFromName(trade.requester);
    const responser = await MonthMeterData.getFromName(trade.responser);

    return new AdvancedTrade(
      String(trade.id),
      requester!,
      responser!,
      trade.quantity,
      trade.status,
      trade.day
    );
  }
}

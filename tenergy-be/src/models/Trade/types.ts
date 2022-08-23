import { Schema } from "mongoose";

export type TradeStatus = "request" | "reject" | "establish" | "cancle";

export interface ITrade {
  id: Schema.Types.ObjectId;

  requester: string;
  responser: string;
  quantity: number;
  status: TradeStatus;

  createdAt: Date;
  updatedAt: Date;
}

export class Trade implements ITrade {
  id!: Schema.Types.ObjectId;

  requester: string;
  responser: string;
  quantity: number;
  status: TradeStatus;

  createdAt!: Date;
  updatedAt!: Date;

  constructor(
    requester: string,
    responser: string,
    quantity: number,
    status: TradeStatus
  ) {
    this.requester = requester;
    this.responser = responser;
    this.quantity = quantity;
    this.status = status;
  }
}

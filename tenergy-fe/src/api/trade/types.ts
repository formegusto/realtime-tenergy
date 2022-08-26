export interface ResGetTrade {
  trade: TradeRequest;
}

export interface ResGetSample {
  seller: TraderRole;
  buyer: TraderRole;
}

export type TradeStatus = "request" | "reject" | "establish" | "cancle";

export interface ReqPatchRequest {
  id: string;
  status: TradeStatus;
}

export interface RequestItem {
  id: string;
  requester: Trader;
  responser: Trader;
  quantity: number;
  status: string;
  day: number;
}

export interface TradeItem {
  _id: string;
  quantity: number;
  price: number;
}

export type TradeRequest = {
  _id?: string;
  requester: string;
  responser: string;
  quantity: number;
};

export interface TraderRole {
  role: string;
  name: string;
  usage: TradeUsage;
  price: TradePrice;
}

export interface Trader {
  name: string;
  kwh: number;
  role: string;
  month: number;
  tradePrice: number;
}

export interface TradeUsage {
  beforeUsage: number;
  afterUsage: number;
  err: number;
}

export interface TradePrice {
  beforePrice: number;
  afterPrice: number;
  err: number;
}

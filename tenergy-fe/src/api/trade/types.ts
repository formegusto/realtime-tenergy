export interface ResGetSample {
  seller: TraderRole;
  buyer: TraderRole;
}

export interface RequestItem {
  requester: Trader;
  responser: Trader;
  quantity: number;
  status: string;
  day: number;
}

export type TradeRequest = {
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

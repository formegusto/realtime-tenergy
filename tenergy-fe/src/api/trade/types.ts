export interface ResGetSample {
  seller: Trader;
  buyer: Trader;
}

export type TradeRequest = {
  requester: string;
  responser: string;
  quantity: number;
};

export interface Trader {
  role: string;
  name: string;
  usage: TradeUsage;
  price: TradePrice;
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

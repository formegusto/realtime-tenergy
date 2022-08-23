export interface TradeRequest {
  requester: string;
  responser: string;
  quantity: number;
}

export interface Usage {
  beforeUsage: number;
  afterUsage: number;
  err: number;
}

export interface Price {
  beforePrice: number;
  afterPrice: number;
  err: number;
}

export interface Sample {
  role: "buyer" | "seller";
  name: string;
  usage: Usage;
  price: Price;
}

export interface SampleResponse {
  buyer: Sample;
  seller: Sample;
}

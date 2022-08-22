export interface ResGetMarketStatus {
  buyerCount: number;
  sellerCount: number;
  tradable: number[];
  average: number[];
}

export interface ResGetSellers {
  tradableUsage: TradableUsage;
  sellers: Seller[];
}

export interface ResGetBuyers {
  average: number;
  prevErr: number;
  buyers: Buyer[];
}

export interface TradableUsage {
  kwh: number;
  prevErr: number;
}

export interface Seller {
  _id: string;
  name: string;
  kwh: number[];
}

export interface Buyer {
  name: string;
  nowPrice: number;
  prevPrice: number;
  err: number;
  history: number[];
}

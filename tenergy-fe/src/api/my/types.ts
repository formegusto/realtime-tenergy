import { Distribution } from "@api/types";

export interface ResGetMy {
  meter: Meter;
  price: Price;
  distribution: Distribution;
  history: number[];
}

export interface Meter {
  kwh: number;
  step: number;
}

export interface Price {
  basicPrice: number;
  elecRatePrice: number;
  householdPrice: number;
  publicPrice: number;
  tradePrice: number;
  bill: number;
}

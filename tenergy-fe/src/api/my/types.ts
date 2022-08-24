import { Distribution } from "@api/types";

export interface ResGetMy {
  meter: Meter;
  price: Price;
  distribution: Distribution;
  history: Kwh[];
}

export interface Kwh {
  value: number;
  day: number;
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
  tradeReqCount: number;
  bill: number;
}

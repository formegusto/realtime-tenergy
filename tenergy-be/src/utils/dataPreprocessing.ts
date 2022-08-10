import { NUGIN_ERR } from "@common";
import _ from "lodash";
import { monthToSeason } from "./convert";

// public percentage와 세대부 사용량 전달 시, APT와 공용부 사용량 반환
export function getWholeUsages(
  householdPart: number,
  publicPercentage: number
): [number, number] {
  const apt = Math.round((householdPart * 100) / (100 - publicPercentage));
  const publicPart = apt - householdPart;

  return [apt, publicPart];
}

// histogram
export function histogram(datas: Array<number>) {
  if (_.every(datas, (v) => v === 0)) return [-1, 0];

  const max = Math.max.apply(null, datas);
  const min = Math.min.apply(null, datas);

  const len = max - min + 1;
  const numberOfBins = Math.round(Math.sqrt(datas.length / 2));
  const binRange = len / numberOfBins;

  const values = new Array(numberOfBins + 1).fill(0);
  _.forEach(datas, (v) => {
    const idx = Math.floor((v - min) / binRange);

    if (values[idx + 1] < v) values[idx + 1] = v;
  });

  return _.filter(values, (v, idx) => idx === 0 || v !== 0);
}

// 구매자, 판매자 역할 여부 판단
export function getRole(kwh: number, month: number): "buyer" | "seller" {
  const season = monthToSeason(month);
  const nuginErr = NUGIN_ERR[season];

  return kwh <= nuginErr[0] ? "seller" : "buyer";
}

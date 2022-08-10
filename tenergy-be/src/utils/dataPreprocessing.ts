import { ELECRATE, NUGIN_ERR, NUGIN_STEP } from "@common";
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

// 수요함수
export function demandFunction(
  kwh: number,
  quantity: number,
  month: number
): number {
  const season = monthToSeason(month);

  const _nuginStep = _.takeRight(NUGIN_STEP[season], 2);
  const min = _nuginStep[1];

  const demands = _.map(
    _.map(_nuginStep, (v) => kwh - v),
    (v) => (v > 0 ? v : 0)
  );

  let [X1, X2] = [demands[1] * -1, demands[0] - demands[1]];
  let [Y2, Y1] = ELECRATE;

  const gradient = (Y2 - Y1) / (X2 - 0);
  const _getDemand = (x: number) => gradient * x * Y1;
  Y1 = _getDemand(X1);

  return _getDemand(quantity);
}

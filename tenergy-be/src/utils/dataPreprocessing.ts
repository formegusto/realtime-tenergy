import _ from "lodash";

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
  const max = Math.max.apply(null, datas);
  const min = Math.min.apply(null, datas);

  const numberOfBins = Math.round(Math.sqrt(datas.length / 2));
  const values = new Array(numberOfBins).fill(0);
}

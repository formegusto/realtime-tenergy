// public percentage와 세대부 사용량 전달 시, APT와 공용부 사용량 반환
export function getWholeUsages(
  householdPart: number,
  publicPercentage: number
): [number, number] {
  const apt = Math.round((householdPart * 100) / (100 - publicPercentage));
  const publicPart = apt - householdPart;

  return [apt, publicPart];
}

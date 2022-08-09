export default function histogram(
  X: Array<number>,
  // binRange: number
  numberOfBins: number
): [Array<number>, Array<number>] {
  const max = Math.max.apply(null, X);
  const min = Math.min.apply(null, X);

  const len = max - min + 1;

  // const numberOfBins = Math.ceil(len / binRange);
  // const numberOfBins = Math.round(Math.sqrt(X.length / 2));
  console.log(numberOfBins);
  const binRange = len / numberOfBins;
  // console.log(binRange);
  const bins = new Array(numberOfBins).fill(0);
  const histInfo = new Array(numberOfBins + 1).fill(0);
  histInfo[0] = min - 1;
  X.forEach((x) => {
    const idx = Math.floor((x - min) / binRange);
    // console.log(idx);
    // const idx = Math.floor((x - min) / numberOfBins);
    bins[idx]++;

    if (histInfo[idx + 1] < x) histInfo[idx + 1] = x;
  });

  return [histInfo, bins];
}

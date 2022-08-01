export default function histogram(X: Array<number>, binRange: number) {
  const max = Math.max.apply(null, X);
  const min = Math.min.apply(null, X);

  const len = max - min + 1;
  const numberOfBins = Math.ceil(len / binRange);
  const bins = new Array(numberOfBins).fill(0);
  X.forEach((x) => bins[Math.floor((x - min) / binRange)]++);

  return bins;
}

import histogram from "./histogram";
import _ from "lodash";
import { getColList } from "./calculator";
import { getDemand } from "./demandFunction";

// histogram process
const arr = [1, 5, 2, 4, 2, 5, 2, 3, 1, 10, 11, 12, 15, 20, 7, 6, 13];
const arr2 = new Array(arr.length).fill(0);

arr2[2] = 1;
const [histInfo, bins] = histogram(arr, 7);
const _histInfo = _.take(histInfo, histInfo.length - 1);

console.log(histInfo);
console.log(bins);
console.log("hist2", histogram(arr2, 7));

// distribute group
arr.map((v) => {
  console.log(
    _.findIndex(
      _histInfo,
      (h, idx) => histInfo[idx] < v && histInfo[idx + 1] >= v
    )
  );
});

// calculator
console.log(getColList(400));

// demand function
console.log(getDemand(10, 600) * 30);

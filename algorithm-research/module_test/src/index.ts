import histogram from "./histogram";
import _ from "lodash";
import { getColList } from "./calculator";
import { getDemand } from "./demandFunction";

// histogram process
const arr = [1, 5, 2, 4, 2, 5, 2, 3, 1];
const [histInfo, bins] = histogram(arr, 2);
const _histInfo = _.take(histInfo, histInfo.length - 1);

console.log(histInfo);
console.log(bins);

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

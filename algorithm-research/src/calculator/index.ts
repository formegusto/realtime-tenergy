import _ from "lodash";
import { NUGIN_ERR_VALUES, NUGIN_STEP_VALUES } from "./elecRate";

export function getColList(kwh: number) {
  const _1 = _.map(NUGIN_STEP_VALUES, (v) => kwh - v);
  console.log(_1);

  const _2 = _.map(_1, (v, idx) =>
    v < NUGIN_ERR_VALUES[idx] ? v : NUGIN_ERR_VALUES[idx]
  );
  console.log(_2);

  const _3 = _.map(_2, (v) => (v > 0 ? v : 0));
  console.log(_3);
}

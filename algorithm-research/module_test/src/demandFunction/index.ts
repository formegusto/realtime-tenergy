import _ from "lodash";
import { NUGIN_STEP_VALUES } from "../calculator/elecRate";

const ELECRATE: Array<number> = [78.2, 147.2, 215.5];

export function getDemand(tardeQty: number, kwh: number) {
  const NUGIN_STEP = _.takeRight(NUGIN_STEP_VALUES, 2);
  const min = NUGIN_STEP[1];

  const demands = _.map(
    _.map(NUGIN_STEP, (v) => kwh - v),
    (v) => (v > 0 ? v : 0)
  );
  console.log(demands);

  let [X1, X2] = [demands[1] * -1, demands[0] - demands[1]];
  let [Y2, Y1] = ELECRATE;
  console.log(X1, X2);
  console.log(Y2, Y1);

  const gradient = (Y2 - Y1) / (X2 - 0);
  console.log(gradient);
  const _getDemand = (x: number) => gradient * x + Y1;
  Y1 = _getDemand(X1);
  console.log(Y1);

  return _getDemand(tardeQty);
}

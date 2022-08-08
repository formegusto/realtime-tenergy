import { Schema } from "mongoose";
import _ from "lodash";
import { BASIC, ELECRATE, NUGIN_ERR, NUGIN_STEP } from "../../common";
import { monthToSeason } from "../../utils";

export type DayMeterData = {
  _id: Schema.Types.ObjectId;
  time: Date;
  data: Array<Household>;
};

export class Household {
  name!: string;
  kwh!: number;
  month!: number;

  constructor(name: string, kwh: number, month: number) {
    this.name = name;
    this.kwh = kwh;
    this.month = month;
  }

  get steps(): Array<number> {
    // 1. 각 단계별 차이를 구한다.
    let steps = _.map(
      NUGIN_STEP[monthToSeason(this.month)],
      (v) => this.kwh - v
    );
    // console.log(steps);

    // 2. 각 단계별 오차보다 큰지 확인한다. 작으면 해당 단계의 가구이다.
    steps = _.map(steps, (v, idx) =>
      v < NUGIN_ERR[monthToSeason(this.month)][idx]
        ? v
        : NUGIN_ERR[monthToSeason(this.month)][idx]
    );
    // console.log(steps);

    // 3. 0을 걸러준다.
    steps = _.map(steps, (v) => (v > 0 ? v : 0));
    // console.log(steps);

    return steps;
  }

  get step(): number {
    return _.findLastIndex(this.steps, (v) => v !== 0);
  }

  get basic(): number {
    return BASIC[this.step];
  }

  get elecRate(): number {
    const steps = this.steps;

    return Math.round(
      _.reduce(
        ELECRATE,
        (acc: number, rate: number, idx: number) => acc + rate * steps[idx],
        0
      )
    );
  }

  get bill(): number {
    return this.basic + this.elecRate;
  }
}

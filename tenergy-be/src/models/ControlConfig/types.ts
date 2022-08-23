import { ResponseError } from "@common";
import { StatusCodes } from "http-status-codes";
import { Schema } from "mongoose";
import { ControlConfigModel } from ".";

type Day = {
  now: number;
  max: number;
};

export type IControlConfig = {
  _id?: Schema.Types.ObjectId;
  month: number;
  publicPercentage: number;
  increasePublicUsage: number;
  day: Day;

  createdAt?: Date;
  updatedAt?: Date;
};

export class ControlConfig {
  _id!: Schema.Types.ObjectId;
  month: number;
  publicPercentage: number;
  increasePublicUsage: number;
  day: Day;

  createdAt!: Date;
  updatedAt!: Date;

  constructor(
    month: number,
    publicPercentage: number,
    increasePublicUsage: number,
    day: Day
  ) {
    this.month = month;
    this.publicPercentage = publicPercentage;
    this.increasePublicUsage = increasePublicUsage;
    this.day = day;
  }

  static async getRecently(): Promise<ControlConfig> {
    const controlConfig = await ControlConfigModel.find(
      {},
      {},
      {
        sort: { updatedAt: -1 },
      }
    );

    if (controlConfig.length < 1)
      throw new ResponseError(
        StatusCodes.NOT_FOUND,
        "관리자 측에서 설정한 제어 정보가 없습니다."
      );

    return new ControlConfig(
      controlConfig[0].month,
      controlConfig[0].publicPercentage,
      controlConfig[0].increasePublicUsage,
      controlConfig[0].day
    );
  }
}

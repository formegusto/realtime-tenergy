import { Schema } from "mongoose";

/*
apt : 아파트 전체 사용량
household : 세대부 사용량
public : 공용부 사용량
*/
export type APT = {
  _id?: Schema.Types.ObjectId;
  apt: number;
  household: number;
  public: number;
  householdCount: number;
  createdAt?: Date;
  updatedAt?: Date;

  controlId: Schema.Types.ObjectId;
};

import { histogram } from "@utils";
import { Schema } from "mongoose";

export class Distributor {
  _id!: Schema.Types.ObjectId;

  binValues: Array<number>;

  createdAt!: Date;
  updatedAt!: Date;

  controlId!: Schema.Types.ObjectId;

  constructor(datas: Array<number>) {
    this.binValues = histogram(datas);
  }

  static generateBinValues = (datas: Array<number>) => histogram(datas);
}

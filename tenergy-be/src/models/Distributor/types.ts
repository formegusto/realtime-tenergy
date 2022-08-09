import { histogram } from "@/utils";
import { Schema } from "mongoose";

export class Distributor {
  _id!: Schema.Types.ObjectId;

  binValues: Array<number>;

  createdAt!: Date;
  updatedAt!: Date;

  constructor(datas: Array<number>) {
    this.binValues = histogram(datas);
  }
}

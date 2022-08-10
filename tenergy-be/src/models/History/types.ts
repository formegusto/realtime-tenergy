import { Schema } from "mongoose";

export type History = {
  _id?: Schema.Types.ObjectId;
  APT: number[];
  public: number[];
  buyerCount: number[];
  sellerCount: number[];
  tradable: number[];

  controlId: Schema.Types.ObjectId;
};

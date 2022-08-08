declare namespace Express {
  export interface Request {
    control: {
      _id: String;
      month: Number;
      publicPercentage: Number;
      aptId?: Schema.Types.ObjectId;
      increasePublicValue?: Number;

      createdAt: Date;
      updatedAt: Date;
    };
  }
}

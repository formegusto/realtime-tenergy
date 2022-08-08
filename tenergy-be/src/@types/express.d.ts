declare namespace Express {
  export interface Request {
    control: {
      _id: String;
      month: number;
      publicPercentage: number;
      aptId?: Schema.Types.ObjectId;
      increasePublicUsage?: number;

      createdAt: Date;
      updatedAt: Date;

      day: {
        now: number;
        max: number;
      };
    };
  }
}

declare namespace Express {
  export interface Request {
    control: {
      _id: String;
      month: number;
      publicPercentage: number;
      aptId?: Schema.Types.ObjectId;
      increasePublicUsage?: number;

      // JWT 는 Date를 묶지 못함!
      createdAt: string;
      updatedAt: string;

      day: {
        now: number;
        max: number;
      };
    };
  }
}

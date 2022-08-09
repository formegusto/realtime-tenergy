declare namespace Express {
  export interface Request {
    control: {
      _id: string;
      month: number;
      publicPercentage: number;
      increasePublicUsage?: number;

      // JWT 는 Date를 묶지 못함!
      createdAt: string;
      updatedAt: string;

      day: {
        now: number;
        max: number;
      };
    };
    household: {
      _id: string;
      name: string;
    };
  }
}

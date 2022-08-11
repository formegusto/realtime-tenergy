export interface Control {
  _id: string;
  month: number;
  publicPercentage: number;
  increasePublicUsage: number;
  day: Day;
  createdAt: string;
  updatedAt: string;
}

export interface Day {
  now: number;
  max: number;
}

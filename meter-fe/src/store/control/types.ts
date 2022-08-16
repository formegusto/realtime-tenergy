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

export interface APT {
  _id: string;
  apt: number;
  household: number;
  public: number;
  householdCount: number;
  controlId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResGetAPT {
  apt: Apt;
  aptMean: Apt;
  history: number[];
}

export interface Apt {
  apt: number;
  household: number;
  public: number;
  householdCount?: number;
}

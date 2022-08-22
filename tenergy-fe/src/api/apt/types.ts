export interface ResGetAPT {
  apt: Apt;
  aptMean: AptMean;
  history: number[];
}

export interface Apt {
  apt: number;
  household: number;
  public: number;
  householdCount: number;
}

export interface AptMean {
  apt: number;
  household: number;
  public: number;
}

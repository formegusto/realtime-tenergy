export interface Root {
  publicPrice: number;
  distributionTable: DistributionTable[];
}

export interface DistributionTable {
  groupNo: number;
  contribute: number;
  price: number;
  err: number;
}

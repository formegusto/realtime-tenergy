export interface ResGetPublic {
  publicPrice: number;
  distributionTable: Distribution[];
}

export interface ResGetPublicById {
  publicPrice: number;
  err: number;
  privatePublicPrice: number;
  distribution: Distribution;
  histInfo: number[];
  distributionTable: Distribution[];
}

export interface Distribution {
  groupNo: number;
  contribute: number;
  price: number;
  err: number;
}

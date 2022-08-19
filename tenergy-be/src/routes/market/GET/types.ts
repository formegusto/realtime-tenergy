export type ReqRootQuery = {
  quantity: number;
};

export type ResRootBody = {
  buyerCount: number;
  sellerCount: number;
  tradable: number[];
  average: number[];
};

import { ResGetSellers, Seller } from "@api/types";

export interface SellerItemProps {
  onClick: (responser: string) => void;
  datas?: Seller[][];
}

export interface SellerComponentProps {
  data?: ResGetSellers;
}

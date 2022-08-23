import { ResGetSellers, Seller } from "@api/types";

export interface SellerItemProps {
  onClick: () => void;
  datas?: Seller[][];
}

export interface SellerComponentProps {
  data?: ResGetSellers;
}

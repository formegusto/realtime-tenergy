import { Buyer, ResGetBuyers } from "@api/types";

export interface BuyerItemProps {
  onClick: () => void;
  datas?: Buyer[];
}
export interface BuyerComponentProps {
  data: ResGetBuyers;
}

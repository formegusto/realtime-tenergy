import { Buyer, ResGetBuyers } from "@api/types";

export interface BuyerItemProps {
  onClick: (responser: string) => void;
  datas?: Buyer[];
}
export interface BuyerComponentProps {
  data: ResGetBuyers;
}

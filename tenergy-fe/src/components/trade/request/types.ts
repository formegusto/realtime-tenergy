import { TradeItem } from "@api/types";

export type TableItemProps = {
  type: "buyer" | "seller";
};

export type TradeRequestProps = {
  requestId?: string;
  type: "request" | "response";
  requester: string;
  responser: string;
  quantity: number;
};

export interface InformationProps {
  cancleOpen: (selected: TradeItem) => void;
  data: TradeItem[];
}

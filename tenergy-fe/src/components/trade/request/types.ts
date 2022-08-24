export type TableItemProps = {
  type: "buyer" | "seller";
};

export type TradeRequestProps = {
  type: "request" | "response";
  requester: string;
  responser: string;
};

export interface InformationProps {
  cancleOpen: () => void;
}

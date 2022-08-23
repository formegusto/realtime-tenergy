export type TableItemProps = {
  role: "buyer" | "seller";
};

export type TradeRequestProps = {
  type: "request" | "response";
};

export interface InformationProps {
  cancleOpen: () => void;
}

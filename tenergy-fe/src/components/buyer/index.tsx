import styled from "styled-components";
import BuyerList from "./BuyerList";
import TotalAverage from "./TotalAverage";
import { BuyerComponentProps, BuyerItemProps } from "./types";

export function BuyerComponent({
  data,
  onClick,
}: BuyerItemProps & BuyerComponentProps) {
  return (
    <Wrap>
      <TotalAverage {...data} />
      <BuyerList datas={data.buyers} onClick={onClick} />
    </Wrap>
  );
}

const Wrap = styled.div`
  padding: 0 12px;
`;

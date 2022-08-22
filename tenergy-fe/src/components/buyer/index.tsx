import { ResGetBuyers } from "@api/types";
import styled from "styled-components";
import BuyerList from "./BuyerList";
import TotalAverage from "./TotalAverage";

type Props = {
  data: ResGetBuyers;
};

export function BuyerComponent({ data }: Props) {
  return (
    <Wrap>
      <TotalAverage {...data} />
      <BuyerList datas={data.buyers} />
    </Wrap>
  );
}

const Wrap = styled.div`
  padding: 0 12px;
`;

import styled from "styled-components";
import BuyerList from "./BuyerList";
import TotalAverage from "./TotalAverage";

export function BuyerComponent() {
  return (
    <Wrap>
      <TotalAverage />
      <BuyerList />
    </Wrap>
  );
}

const Wrap = styled.div`
  padding: 0 12px;
`;

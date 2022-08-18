import styled from "styled-components";
import SellerList from "./SellerList";
import TradableUsage from "./TrableUsage";

export function SellerComponent() {
  return (
    <Wrap>
      <TradableUsage />
      <SellerList />
    </Wrap>
  );
}

const Wrap = styled.div`
  padding: 0 12px;
`;

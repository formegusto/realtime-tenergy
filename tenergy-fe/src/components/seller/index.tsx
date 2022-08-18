import styled from "styled-components";
import TradableUsage from "./TrableUsage";

export function SellerComponent() {
  return (
    <Wrap>
      <TradableUsage />
    </Wrap>
  );
}

const Wrap = styled.div`
  padding: 0 12px;
`;

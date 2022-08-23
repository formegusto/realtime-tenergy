import styled from "styled-components";
import SellerList from "./SellerList";
import TradableUsage from "./TrableUsage";
import _ from "lodash";
import { SellerComponentProps, SellerItemProps } from "./types";

export function SellerComponent({
  data,
  onClick,
}: SellerItemProps & SellerComponentProps) {
  return data ? (
    <Wrap>
      <TradableUsage data={data.tradableUsage} />
      <SellerList datas={_.chunk(data.sellers, 2)} onClick={onClick} />
    </Wrap>
  ) : (
    <></>
  );
}

const Wrap = styled.div`
  padding: 0 12px;
`;

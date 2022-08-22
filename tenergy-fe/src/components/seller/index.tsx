import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import SellerList from "./SellerList";
import TradableUsage from "./TrableUsage";
import _ from "lodash";
import { getSellers } from "@api";

export function SellerComponent() {
  const { data } = useQuery(["getSellersQuery"], getSellers, {
    refetchOnWindowFocus: false,
  });

  return data ? (
    <Wrap>
      <TradableUsage data={data.tradableUsage} />
      <SellerList datas={_.chunk(data.sellers, 2)} />
    </Wrap>
  ) : (
    <></>
  );
}

const Wrap = styled.div`
  padding: 0 12px;
`;

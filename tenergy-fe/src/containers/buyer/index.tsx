import { getBuyers } from "@api";
import { BuyerComponent } from "@component";
import { quantityState } from "@store/atom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

export function BuyerContainer() {
  const quantity = useRecoilValue(quantityState);
  const { data } = useQuery(
    ["getBuyersQuery", quantity],
    ({ queryKey }) => getBuyers(queryKey[1] as any),
    {
      refetchOnWindowFocus: false,
    }
  );

  return data ? <BuyerComponent data={data} /> : <></>;
}

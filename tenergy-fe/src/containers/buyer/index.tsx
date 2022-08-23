import { getBuyers } from "@api";
import { BuyerComponent, TradeRequest } from "@component";
import { useModal } from "@hooks";
import { quantityState } from "@store/atom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

export function BuyerContainer() {
  const [Modal, , open, close] = useModal({
    modal: TradeRequest,
  });

  const quantity = useRecoilValue(quantityState);
  const { data } = useQuery(
    ["getBuyersQuery", quantity],
    ({ queryKey }) => getBuyers(queryKey[1] as any),
    {
      refetchOnWindowFocus: false,
    }
  );

  return data ? (
    <>
      <BuyerComponent data={data} onClick={open} />
      <Modal type="request" closeAction={close} />
    </>
  ) : (
    <></>
  );
}

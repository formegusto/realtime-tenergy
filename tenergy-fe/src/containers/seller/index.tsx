import { getSellers } from "@api";
import { SellerComponent, TradeRequest } from "@component";
import { useModal } from "@hooks";
import { useQuery } from "@tanstack/react-query";

export function SellerContainer() {
  const { data } = useQuery(["getSellersQuery"], getSellers, {
    refetchOnWindowFocus: false,
  });
  const [Modal, , open, close] = useModal({
    modal: TradeRequest,
  });

  return (
    <>
      <SellerComponent data={data} onClick={open} />
      <Modal type="request" closeAction={close} />
    </>
  );
}

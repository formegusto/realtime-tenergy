import { getSellers } from "@api";
import { SellerComponent, TradeRequest } from "@component";
import { useModal } from "@hooks";
import { householdState, quantityState } from "@store/atom";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useRecoilValue } from "recoil";

export function SellerContainer() {
  const auth = useRecoilValue(householdState);
  const quantity = useRecoilValue(quantityState);
  const [responser, setResponser] = React.useState<string | null>(null);
  const { data } = useQuery(["getSellersQuery"], getSellers, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
  const [Modal, , open, close] = useModal({
    modal: TradeRequest,
  });
  const onClick = React.useCallback(
    (responser: string) => {
      setResponser(responser);
      open();
    },
    [open]
  );

  return (
    <>
      <SellerComponent data={data} onClick={onClick} />
      {responser && auth && (
        <Modal
          type="request"
          closeAction={close}
          requester={auth.name}
          responser={responser}
          quantity={quantity}
        />
      )}
    </>
  );
}

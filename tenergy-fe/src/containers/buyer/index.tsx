import { getBuyers } from "@api";
import { BuyerComponent, TradeRequest } from "@component";
import { useModal } from "@hooks";
import { householdState, quantityState } from "@store/atom";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useRecoilValue } from "recoil";

export function BuyerContainer() {
  const auth = useRecoilValue(householdState);
  const [responser, setResponser] = React.useState<string | null>(null);
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
  const onClick = React.useCallback(
    (responser: string) => {
      setResponser(responser);
      open();
    },
    [open]
  );

  return data ? (
    <>
      <BuyerComponent data={data} onClick={onClick} />
      {responser && auth && (
        <Modal
          type="request"
          closeAction={close}
          requester={auth.name}
          responser={responser}
        />
      )}
    </>
  ) : (
    <></>
  );
}

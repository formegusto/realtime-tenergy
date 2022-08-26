import { getTrade } from "@api";
import { TradeRequest } from "@component";
import { TradeRequest as ITradeRequest } from "@api/types";
import { useMutation } from "@tanstack/react-query";
import { useModal } from "@utils/hooks";
import React from "react";
import { AlertForm, AlertWrap } from "./style";
import { AlertProps } from "./types";

function AlertListener({ alerts }: AlertProps) {
  const [Modal, , open, close] = useModal({ modal: TradeRequest });
  const [trade, setTrade] = React.useState<ITradeRequest | null>(null);
  const getTradeMutation = useMutation(["getTradeQuery"], getTrade, {
    onSuccess: ({ trade }) => {
      setTrade(trade);
      open();
    },
  });

  const openRequest = React.useCallback(
    (id: string) => {
      getTradeMutation.mutate(id);
    },
    [getTradeMutation]
  );

  const closeAction = React.useCallback(() => {
    setTrade(null);
    close();
  }, [close]);
  // const pushAlert = React.useCallback(() => {
  //   setAlerts(
  //     _.concat(alerts, {
  //       message: "새 거래 요청이 들어왔습니다.",
  //       id: "630851dbadad78a0c0091a68",
  //     })
  //   );
  // }, [alerts, setAlerts]);

  return (
    <AlertWrap>
      {alerts.map((alert, idx) => (
        <AlertForm
          alert={alert}
          key={`new-request-alert-${idx}`}
          onSelected={openRequest}
        />
      ))}
      {trade && (
        <Modal
          closeAction={closeAction}
          requestId={trade._id}
          quantity={trade.quantity}
          requester={trade.requester}
          responser={trade.responser}
          type="response"
        />
      )}
    </AlertWrap>
  );
}

export default AlertListener;

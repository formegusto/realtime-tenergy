import { getRequests, getSample, postRequest } from "@api";
import { RequestItem } from "@api/types";
import { Button, ButtonGroup } from "@component/common/button";
import { FullScreenModal } from "@component/common/container";
import { ModalProps } from "@component/common/container/modal/types";
import {
  Table,
  TableBody,
  TableBodyCol,
  TableBodyRow,
  TableHead,
  TableHeadCol,
  TableHeadRow,
} from "@component/common/table";
import { useModal } from "@hooks";
import { H2 } from "@styles/typo";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { TradeConfirmModal } from "../etc";
import Information from "./Information";
import RequestTable from "./RequestTable";
import RequestUsage from "./RequestUsage";
import { TradeRequestProps } from "./types";

export function TradeRequest({
  type,
  closeAction,
  requester,
  responser,
  quantity,
}: TradeRequestProps & ModalProps) {
  const { data, isLoading } = useQuery(
    ["getTradeSampleQuery"],
    () =>
      getSample({
        quantity,
        responser,
        requester,
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
  const requestMutation = useMutation(["postRequestQuery"], postRequest, {
    onSuccess: () => {
      closeAction!();
    },
  });

  const requestTrade = React.useCallback(() => {
    requestMutation.mutate({
      quantity,
      responser,
      requester,
    });
  }, [quantity, responser, requester, requestMutation]);

  return (
    <FullScreenModal closeAction={closeAction}>
      {!isLoading && data && (
        <>
          <RequestUsage>{quantity}</RequestUsage>
          <RequestTable {...data} />
          {type === "request" ? (
            <Button
              className="confirm-btn"
              colorTheme="darkgreen"
              isBlock
              onClick={() => requestTrade()}
            >
              거래요청
            </Button>
          ) : (
            <ButtonGroup className="confirm-btn">
              <Button colorTheme="red">거절</Button>
              <Button colorTheme="darkgreen">수정</Button>
            </ButtonGroup>
          )}
        </>
      )}
    </FullScreenModal>
  );
}

export function TradeRequestList({ closeAction }: ModalProps) {
  const { isLoading, data } = useQuery(["getRequestQuery"], getRequests);
  const [selected, setSelected] = React.useState<RequestItem | null>(null);
  const [Modal, , open, close] = useModal({
    modal: TradeRequest,
  });

  const selectRequest = React.useCallback(
    (selected: RequestItem) => {
      setSelected(selected);
      open();
    },
    [open]
  );

  return (
    <>
      {!isLoading && data && (
        <>
          <FullScreenModal closeAction={closeAction}>
            <Table fontStyle="p2" padding="18px 0">
              <colgroup>
                <col width="20%"></col>
                <col width="60%"></col>
                <col width="20%"></col>
              </colgroup>
              <TableHead fontDensity={900}>
                <TableHeadRow>
                  <TableHeadCol isCenter>NO</TableHeadCol>
                  <TableHeadCol isCenter>요청자</TableHeadCol>
                  <TableHeadCol isCenter>사용량</TableHeadCol>
                </TableHeadRow>
              </TableHead>
              <TableBody>
                {data.map((d, idx) => (
                  <TableBodyRow
                    key={`trade-requst-${idx}`}
                    onClick={() => selectRequest(d)}
                    isCursor
                  >
                    <TableBodyCol isCenter>{idx + 1}</TableBodyCol>
                    <TableBodyCol isCenter>{d.requester.name}</TableBodyCol>
                    <TableBodyCol isCenter>
                      {Math.round(d.requester.kwh)}
                    </TableBodyCol>
                  </TableBodyRow>
                ))}
              </TableBody>
            </Table>
          </FullScreenModal>
          {selected && (
            <Modal
              type="response"
              closeAction={close}
              requester={selected!.requester.name}
              responser={selected!.responser.name}
              quantity={selected!.quantity}
            />
          )}
        </>
      )}
    </>
  );
}

export function TradeInformation({ closeAction }: ModalProps) {
  const [Modal, , open, close] = useModal({ modal: TradeConfirmModal });
  return (
    <>
      <FullScreenModal closeAction={closeAction}>
        <H2 className="title">보유 거래 사용량</H2>
        <Information cancleOpen={open} />
      </FullScreenModal>
      <Modal closeAction={close} />
    </>
  );
}

import { Button, ButtonGroup } from "@component/common/button";
import { FullScreenModal } from "@component/common/container";
import {
  Table,
  TableBody,
  TableBodyCol,
  TableBodyRow,
  TableHead,
  TableHeadCol,
  TableHeadRow,
} from "@component/common/table";
import { H2 } from "@styles/typo";
import Information from "./Information";
import RequestTable from "./RequestTable";
import RequestUsage from "./RequestUsage";
import { TradeRequestProps } from "./types";

export function TradeRequest({ type }: TradeRequestProps) {
  return (
    <FullScreenModal>
      <RequestUsage>30</RequestUsage>
      <RequestTable />
      {type === "request" ? (
        <Button className="confirm-btn" colorTheme="darkgreen" isBlock>
          거래요청
        </Button>
      ) : (
        <ButtonGroup className="confirm-btn">
          <Button colorTheme="red">거절</Button>
          <Button colorTheme="darkgreen">수정</Button>
        </ButtonGroup>
      )}
    </FullScreenModal>
  );
}

export function TradeRequestList() {
  return (
    <FullScreenModal>
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
            <TableHeadCol isCenter>가격</TableHeadCol>
          </TableHeadRow>
        </TableHead>
        <TableBody>
          <TableBodyRow>
            <TableBodyCol isCenter>1</TableBodyCol>
            <TableBodyCol isCenter>101동-1002호</TableBodyCol>
            <TableBodyCol isCenter>25</TableBodyCol>
          </TableBodyRow>
          <TableBodyRow>
            <TableBodyCol isCenter>1</TableBodyCol>
            <TableBodyCol isCenter>101동-1002호</TableBodyCol>
            <TableBodyCol isCenter>25</TableBodyCol>
          </TableBodyRow>
          <TableBodyRow>
            <TableBodyCol isCenter>1</TableBodyCol>
            <TableBodyCol isCenter>101동-1002호</TableBodyCol>
            <TableBodyCol isCenter>25</TableBodyCol>
          </TableBodyRow>
          <TableBodyRow>
            <TableBodyCol isCenter>1</TableBodyCol>
            <TableBodyCol isCenter>101동-1002호</TableBodyCol>
            <TableBodyCol isCenter>25</TableBodyCol>
          </TableBodyRow>
        </TableBody>
      </Table>
    </FullScreenModal>
  );
}

export function TradeInformation() {
  return (
    <FullScreenModal>
      <H2 className="title">보유 거래 사용량</H2>
      <Information />
    </FullScreenModal>
  );
}
import { Button } from "@component/common/button";
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
import RequestTable from "./RequestTable";
import RequestUsage from "./RequestUsage";

export function TradeRequest() {
  return (
    <FullScreenModal>
      <RequestUsage>30</RequestUsage>
      <RequestTable />
      <Button className="confirm-btn" colorTheme="darkgreen" isBlock>
        거래요청
      </Button>
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

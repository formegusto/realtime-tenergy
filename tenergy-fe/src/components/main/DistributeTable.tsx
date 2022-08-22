import { Distribution } from "@api/types";
import {
  Table,
  TableBody,
  TableBodyCol,
  TableBodyRow,
  TableHead,
  TableHeadCol,
  TableHeadRow,
} from "@component/common/table";

type Props = {
  datas: Distribution[];
};

function DistributeTable({ datas }: Props) {
  return (
    <Table className="distribute-table">
      <colgroup>
        <col span={2} width="25%" />
        <col width="50%" />
      </colgroup>
      <TableHead>
        <TableHeadRow>
          <TableHeadCol>GROUP NO</TableHeadCol>
          <TableHeadCol>CONTRIBUTE</TableHeadCol>
          <TableHeadCol>PRICE</TableHeadCol>
        </TableHeadRow>
      </TableHead>
      <TableBody>
        {datas.map(({ groupNo, contribute, price, err }) => (
          <TableBodyRow key={`main-distribution-table-row-${groupNo}`}>
            <TableBodyCol>{groupNo}</TableBodyCol>
            <TableBodyCol>{contribute}</TableBodyCol>
            <TableBodyCol>
              <span className="group-price">
                {price.toLocaleString("ko-KR")}
              </span>
              <span className={`compare ${err < 0 ? "benefit" : "loss"}`}>
                {err > 0 && "+"}
                {err.toLocaleString("ko-KR")}
              </span>
            </TableBodyCol>
          </TableBodyRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default DistributeTable;

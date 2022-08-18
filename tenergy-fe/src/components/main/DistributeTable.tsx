import {
  Table,
  TableBody,
  TableBodyCol,
  TableBodyRow,
  TableHead,
  TableHeadCol,
  TableHeadRow,
} from "@component/common/table";

function DistributeTable() {
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
        <TableBodyRow>
          <TableBodyCol>1</TableBodyCol>
          <TableBodyCol>0.03</TableBodyCol>
          <TableBodyCol>
            <span className="group-price">14,634</span>
            <span className="compare benefit">-2,051</span>
          </TableBodyCol>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCol>2</TableBodyCol>
          <TableBodyCol>0.08</TableBodyCol>
          <TableBodyCol>
            <span className="group-price">15,486</span>
            <span className="compare benefit">-1,191</span>
          </TableBodyCol>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCol>3</TableBodyCol>
          <TableBodyCol>0.13</TableBodyCol>
          <TableBodyCol>
            <span className="group-price">16,338</span>
            <span className="compare benefit">-347</span>
          </TableBodyCol>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCol>4</TableBodyCol>
          <TableBodyCol>0.18</TableBodyCol>
          <TableBodyCol>
            <span className="group-price">17,190</span>
            <span className="compare loss">+505</span>
          </TableBodyCol>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCol>5</TableBodyCol>
          <TableBodyCol>0.23</TableBodyCol>
          <TableBodyCol>
            <span className="group-price">18,042</span>
            <span className="compare loss">+1,357</span>
          </TableBodyCol>
        </TableBodyRow>
        <TableBodyRow>
          <TableBodyCol>6</TableBodyCol>
          <TableBodyCol>0.36</TableBodyCol>
          <TableBodyCol>
            <span className="group-price">19,746</span>
            <span className="compare loss">+3,061</span>
          </TableBodyCol>
        </TableBodyRow>
      </TableBody>
    </Table>
  );
}

export default DistributeTable;

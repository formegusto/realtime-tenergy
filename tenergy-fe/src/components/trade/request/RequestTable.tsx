import { Card, CardColGroup, CardRowGroup } from "@component/common/container";
import { white } from "@styles/colors";
import { H1, H3, H5, P2 } from "@styles/typo";
import { fontStyles } from "@styles/typo/styles";
import styled from "styled-components";
import { TableItemProps } from "./types";

function TableItem({ role }: TableItemProps) {
  return (
    <ItemWrap className="req-table-item">
      <ItemHeader>
        <H3>{role === "buyer" ? "구매자" : "판매자"}</H3>
        <H5>102동-1002호</H5>
      </ItemHeader>
      <CardColGroup className="content">
        <CardRowGroup>
          <Card backgroundColor="transparent" padding="10px 0 0px" rowGap={8}>
            <H3>거래 전 사용량</H3>
            <P2 className="prev-usage">
              <span className="value">420kWh</span>
            </P2>
          </Card>
          <Card backgroundColor="transparent" padding="10px 0 0px" rowGap={8}>
            <H3>거래 후 사용량</H3>
            <P2 className="prev-usage">
              <span className="value">390kWh</span>
              <span className="sub-value decrease">-30</span>
            </P2>
          </Card>
        </CardRowGroup>
        <CardRowGroup>
          <Card backgroundColor="transparent" padding="10px 0 " rowGap={8}>
            <H3>거래 이익</H3>
            <P2 className="prev-usage">
              <span className="value">₩ 1,996</span>
            </P2>
          </Card>
        </CardRowGroup>
      </CardColGroup>
    </ItemWrap>
  );
}

const ItemWrap = styled.div`
  margin: 8px 0 0;
  padding: 0 0 8px;
  display: flex;
  flex-direction: column;

  .prev-usage {
    display: flex;
    flex-direction: row;
    align-items: center;

    column-gap: 4px;

    & > .sub-value {
      ${fontStyles["tag2"]}
    }
  }
`;
const ItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 4px 0;

  column-gap: 8px;
  & > h3 {
    font-weight: bold;
  }

  & > h5 {
    font-weight: bold;
  }
`;
function RequestTable() {
  return (
    <Wrap>
      <H1>거래 정보</H1>
      <TableItem role={"buyer"} />
      <TableItem role={"seller"} />
    </Wrap>
  );
}

const Wrap = styled.div`
  color: ${white[900]};
  height: calc(var(--vh) * 100 - 216px - 36px - 24px - 44px - 24px);
  overflow-y: scroll;

  & > h1 {
    padding: 0 0 16px;
    border-bottom: 1px solid ${white[500]};
  }

  & > .req-table-item:not(:last-child) {
    border-bottom: 1px solid ${white[500]};
  }
`;

export default RequestTable;

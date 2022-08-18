import { Card, CardRowGroup } from "@component/common/container";
import { white } from "@styles/colors";
import { Tag1 } from "@styles/typo";
import { fontStyles } from "@styles/typo/styles";
import styled from "styled-components";
import DistributeTable from "./DistributeTable";

function PublicDistributor() {
  return (
    <Wrap>
      <Tag1 className="title">PUBLIC DISTRIBUTOR</Tag1>
      <CardRowGroup>
        <Card>
          <PublicPriceWrap>
            <span className="unit unit-con">₩</span>
            <span className="price">2,911,572</span>
            <span className="unit unit-word">KRW</span>
          </PublicPriceWrap>
        </Card>
      </CardRowGroup>
      <DistributeTable />
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: calc(100% - 24px);
  margin: 0 auto;

  & > .distribute-table {
    margin: 12px 0 0;
  }
`;

const PublicPriceWrap = styled.h1`
  padding: 24px 0;
  display: flex;

  justify-content: center;
  column-gap: 10px;

  align-items: center;
  letter-spacing: 0.1em;

  .unit {
    color: ${white[500]};
    ${fontStyles["h2"]}
  }
  .price {
    color: ${white[900]};
    ${fontStyles["h1"]}
  }
`;

export default PublicDistributor;

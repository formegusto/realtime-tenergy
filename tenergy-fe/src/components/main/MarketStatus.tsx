import { Line } from "@component/common/chart";
import { Card, CardColGroup, CardRowGroup } from "@component/common/container";
import { white } from "@styles/colors";
import { Tag1, Tag2 } from "@styles/typo";
import styled from "styled-components";

function MarketStatus() {
  return (
    <Wrap>
      <Tag1 className="title">MARKET STATUS</Tag1>
      <CardColGroup>
        <CardRowGroup>
          <Card>
            <Tag2 className="card-title">BUYER COUNT</Tag2>
            <Count>56</Count>
          </Card>
          <Card>
            <Tag2 className="card-title">SELLER COUNT</Tag2>
            <Count>12</Count>
          </Card>
        </CardRowGroup>
        <CardRowGroup>
          <Card>
            <Tag2 className="card-title">TOTAL AVERAGE</Tag2>
            <Line datas={[10, 20, 30, 31, 40, 41, 51]} />
          </Card>
          <Card>
            <Tag2 className="card-title">TRADABLE USAGE</Tag2>
            <Line datas={[10, 20, 30, 31, 40, 41, 51]} />
          </Card>
        </CardRowGroup>
      </CardColGroup>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: calc(100% - 24px);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 0 0 32px;

  .card-title {
    color: ${white[500]};
    letter-spacing: 0.1em;

    margin: 0 0 10px;
  }

  .line {
    margin: 10px 0 20px;
    height: 35px;
  }
`;

const Count = styled.h1`
  font-weight: 700;
  font-size: 28px;
  line-height: 35px;
  letter-spacing: 0.1em;
  padding: 10px 0 20px;
  color: ${white[900]};

  text-align: center;
`;

export default MarketStatus;

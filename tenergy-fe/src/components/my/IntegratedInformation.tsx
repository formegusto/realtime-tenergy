import { Card, CardColGroup, CardRowGroup } from "@component/common/container";
import { blue, white } from "@styles/colors";
import { H1, H4 } from "@styles/typo";
import styled from "styled-components";

function IntegratedInformation() {
  return (
    <Wrap>
      <UsageProfile>
        <H1>420</H1>
      </UsageProfile>
      <CardColGroup>
        <CardRowGroup columnGap={12}>
          <Card backgroundColor="transparent" padding="10px">
            <H4 className="cat">기본요금</H4>
            <H4 className="value">₩ 7,300</H4>
          </Card>
          <Card backgroundColor="transparent" padding="10px">
            <H4 className="cat">전력량요금</H4>
            <H4 className="value">₩ 16,852</H4>
          </Card>
        </CardRowGroup>
        <CardRowGroup columnGap={12}>
          <Card backgroundColor="transparent" padding="10px">
            <H4 className="cat">기여도 그룹</H4>
            <H4 className="value">4</H4>
          </Card>
          <Card backgroundColor="transparent" padding="10px">
            <H4 className="cat">공용부 요금</H4>
            <H4 className="value">₩ 17,190</H4>
          </Card>
        </CardRowGroup>
      </CardColGroup>
      <CardRowGroup columnGap={12} className="trade-information">
        <Card backgroundColor="trading" padding="10px">
          <H4 className="cat">기여도 그룹</H4>
          <H4 className="value">4</H4>
        </Card>
        <Card backgroundColor="trading" padding="10px">
          <H4 className="cat">공용부 요금</H4>
          <H4 className="value">₩ 17,190</H4>
        </Card>
      </CardRowGroup>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
  margin: 24px 12px 48px;

  .cat {
    text-align: center;
    color: ${white[100]};
  }

  .value {
    text-align: center;
    color: ${white[900]};
    margin: 10px 0 0;
  }

  .trade-information {
    margin: 24px 0 0;
  }
`;

const UsageProfile = styled.div`
  position: absolute;
  top: -72px;
  left: 0;
  right: 0;
  margin: 0 auto;

  width: 96px;
  height: 96px;
  border-radius: 100%;

  background-color: ${blue[900]};
  color: ${white[900]};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default IntegratedInformation;

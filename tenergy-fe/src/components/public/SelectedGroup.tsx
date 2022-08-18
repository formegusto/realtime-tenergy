import { SelectedPie } from "@component/common/chart";
import { Card, CardColGroup } from "@component/common/container";
import { white } from "@styles/colors";
import { H1, Tag1 } from "@styles/typo";
import styled from "styled-components";

function SelectedGroup() {
  return (
    <Wrap>
      <PieWrap>
        <SelectedPie datas={[1, 2, 3, 4, 3, 4]} selectedIdx={2} />
      </PieWrap>
      <CardColGroup rowGap={10}>
        <Card backgroundColor="transparent" padding="0">
          <Tag1 className="selected-text selected-title">기여도 그룹</Tag1>
          <H1 className="selected-text selected-value">24</H1>
        </Card>
        <Card backgroundColor="transparent" padding="0">
          <Tag1 className="selected-text selected-title">기여도</Tag1>
          <H1 className="selected-text selected-value">0.18</H1>
        </Card>
      </CardColGroup>
    </Wrap>
  );
}

const Wrap = styled.div`
  margin: 24px 0 0;

  display: flex;
  column-gap: 12px;
  color: ${white[900]};

  .selected-value {
    text-align: center;
    padding: 12.5px 0;
  }
`;

const PieWrap = styled.div`
  padding: 0 10px;
  & > .pie {
    width: 150px;
    height: 150px;
  }
`;

export default SelectedGroup;

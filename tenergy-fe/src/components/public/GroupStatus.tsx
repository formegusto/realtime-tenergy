import { Bar } from "@component/common/chart";
import { Tag1 } from "@styles/typo";
import styled from "styled-components";

function GroupStatus() {
  return (
    <Wrap>
      <Tag1 className="title">기여도 그룹 현황</Tag1>
      <Bar datas={[5, 1, 10, 20, 2, 3]} selectedIdx={2} />
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  align-items: center;

  flex-direction: column;
  margin: 64px 0 0;

  & > .bar {
    margin: 28px 0 0;
  }
`;

export default GroupStatus;

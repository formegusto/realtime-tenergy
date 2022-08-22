import { Bar } from "@component/common/chart";
import { Tag1 } from "@styles/typo";
import styled from "styled-components";

type Props = {
  histInfo: number[];
  selectedIdx: number;
};
function GroupStatus({ histInfo, selectedIdx }: Props) {
  return (
    <Wrap>
      <Tag1 className="title">기여도 그룹 현황</Tag1>
      <Bar datas={histInfo} selectedIdx={selectedIdx} />
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

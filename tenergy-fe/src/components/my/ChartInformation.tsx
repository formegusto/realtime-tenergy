import { chartPalette, white } from "@styles/colors";
import { Tag2 } from "@styles/typo";
import styled from "styled-components";

function ChartInformation() {
  return (
    <Wrap>
      {[
        { title: "개인 요금", id: "household" },
        { title: "거래 이익", id: "trading" },
        { title: "공용부 요금", id: "public" },
      ].map(({ title, id }) => (
        <Item key={`price-information-${id}`}>
          <Color background={chartPalette[id]!} />
          <Tag2>{title}</Tag2>
        </Item>
      ))}
    </Wrap>
  );
}

const Wrap = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

const Item = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;

  color: ${white[100]};
  column-gap: 8px;
`;

const Color = styled.div<{ background: string }>`
  width: 24px;
  height: 14px;

  background-color: ${({ background }) => background};
`;

export default ChartInformation;

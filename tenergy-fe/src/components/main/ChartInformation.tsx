import { chartPalette, white } from "@styles/colors";
import { Tag2 } from "@styles/typo";
import styled from "styled-components";

function ChartInformation() {
  return (
    <Wrap>
      {["household", "trading", "public"].map((title) => (
        <Item key={`chart-info-${title}`} className="chart-info-title">
          <Color background={chartPalette[title]!} />
          <Tag2>{title}</Tag2>
        </Item>
      ))}
    </Wrap>
  );
}

const Wrap = styled.ul`
  display: flex;
  row-gap: 4px;
  flex-direction: column;

  color: ${white[100]};

  & > .chart-info-title {
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;

const Item = styled.li`
  display: flex;
  column-gap: 8px;

  align-items: center;
`;

const Color = styled.div<{ background: string }>`
  width: 24px;
  height: 14px;

  background-color: ${({ background }) => background};
`;

export default ChartInformation;

import { TopContainer } from "@component/common/container";
import { white } from "@styles/colors";
import { H1, Tag1 } from "@styles/typo";
import { fontStyles } from "@styles/typo/styles";
import styled from "styled-components";

type Props = {
  average: number;
  prevErr: number;
};

function TotalAverage({ average, prevErr }: Props) {
  return (
    <TopContainer>
      <Tag1 className="title">TOTAL AVERAGE</Tag1>
      <PriceWrap>
        <span className="unit unit-con">₩</span>
        <H1>{average.toLocaleString("ko-KR")}</H1>
        <span className="unit unit-price">KRW</span>
      </PriceWrap>
      <Tag1 className={`compare ${prevErr < 0 ? "loss" : "benefit"}`}>
        {prevErr > 0 && "+"}₩{prevErr.toLocaleString("ko-KR")}
      </Tag1>
    </TopContainer>
  );
}

const PriceWrap = styled.div`
  display: flex;
  column-gap: 8px;
  align-items: center;

  color: ${white[900]};
  margin: 0 0 8px;

  & > .unit {
    ${fontStyles["h2"]}
    color: ${white[500]}
  }
`;

export default TotalAverage;

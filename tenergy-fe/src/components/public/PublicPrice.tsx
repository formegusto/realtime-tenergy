import { TopContainer } from "@component/common/container";
import { white } from "@styles/colors";
import { H1, Tag1 } from "@styles/typo";
import { fontStyles } from "@styles/typo/styles";
import styled from "styled-components";

function PublicPrice() {
  return (
    <TopContainer isRadius isShadow>
      <Tag1 className="title">PUBLIC PRICE</Tag1>
      <PriceWrap>
        <span className="unit unit-con">₩</span>
        <H1>2,911,572</H1>
        <span className="unit unit-price">KRW</span>
      </PriceWrap>
      <Tag1 className="compare loss">+₩67.13</Tag1>
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

export default PublicPrice;

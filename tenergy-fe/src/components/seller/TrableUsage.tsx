import { TopContainer } from "@component/common/container";
import { white } from "@styles/colors";
import { H1, H2, Tag1 } from "@styles/typo";
import { fontStyles } from "@styles/typo/styles";
import { MdFlashOn } from "react-icons/md";
import styled from "styled-components";

function TradableUsage() {
  return (
    <TopContainer>
      <Tag1 className="title">TRADABLE USAGE</Tag1>
      <Usage>
        <MdFlashOn size={20} color={white[500]} />
        <H1 className="usage">2,124</H1>
        <H2 className="unit">kWh</H2>
      </Usage>
      <Compare className="benefit">+100kWh</Compare>
    </TopContainer>
  );
}

const Compare = styled.p`
  ${fontStyles["tag1"]}
`;

const Usage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 8px;

  color: ${white[900]};
  margin: 0 0 8px;
  .unit {
    color: ${white[500]};
  }
`;

export default TradableUsage;

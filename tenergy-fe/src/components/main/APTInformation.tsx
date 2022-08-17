import { Doughnut } from "@component/common/chart";
import { TopContainer } from "@component/common/container";
import { Tag1 } from "@styles/typo";
import styled from "styled-components";
import ChartInformation from "./ChartInformation";

function APTInformation() {
  return (
    <TopContainer>
      <Tag1 className="title">APT INFORMATION</Tag1>
      <Content>
        <Doughnut data={[5, 3, 2]} size={150} />
        <ContentIntro>
          <ChartInformation />
        </ContentIntro>
      </Content>
    </TopContainer>
  );
}

const Content = styled.div`
  display: flex;
  width: calc(100% - 12px);

  column-gap: 16px;
`;

const ContentIntro = styled.div`
  flex: 1;
`;

export default APTInformation;

import { Doughnut, Line } from "@component/common/chart";
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
          <Line datas={[10, 20, 30]} />
        </ContentIntro>
      </Content>
    </TopContainer>
  );
}

const Content = styled.div`
  display: flex;
  width: calc(100% - 24px);
  flex-direction: row;

  column-gap: 16px;
  height: 150px;
`;

const ContentIntro = styled.div`
  flex: 1;
  height: 150px;

  display: flex;
  flex-direction: column;

  row-gap: 4px;

  & > .line {
    flex: 1;

    margin: 0;
    padding: 0;
  }
`;

export default APTInformation;

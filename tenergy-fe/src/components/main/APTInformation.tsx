import { getAPT } from "@api";
import { Doughnut, Line } from "@component/common/chart";
import { TopContainer } from "@component/common/container";
import { Tag1 } from "@styles/typo";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import ChartInformation from "./ChartInformation";

function APTInformation() {
  const { data } = useQuery(["getAptQuery"], getAPT, {});

  return (
    <TopContainer>
      <Tag1 className="title">APT INFORMATION</Tag1>
      <Content>
        {data && <Doughnut apt={data.apt} aptMean={data.aptMean} size={150} />}
        <ContentIntro>
          <ChartInformation />
          {data && <Line datas={data.history} />}
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

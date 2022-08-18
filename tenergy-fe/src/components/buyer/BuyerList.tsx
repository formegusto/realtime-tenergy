import { Line } from "@component/common/chart";
import { Card, CardColGroup } from "@component/common/container";
import { UsageProfile } from "@component/common/etc";
import { white } from "@styles/colors";
import { H5, Tag1 } from "@styles/typo";
import styled from "styled-components";

function BuyerList() {
  return (
    <Wrap>
      <Tag1>거래 추천 가구</Tag1>
      <CardColGroup>
        <Card direction="row" columnGap={6} padding="10px 16px">
          <UsageProfile>420</UsageProfile>
          <HouseholdNames>
            <H5 className="dong">101동</H5>
            <Tag1 className="ho">1000호</Tag1>
          </HouseholdNames>
          <LineWrap>
            <Shadowing />
            <Line datas={[1, 2, 3, 4, 5, 6]} />
          </LineWrap>
          <PriceWrap>
            <H5 className="price">₩82,755.27</H5>
            <Tag1 className="compare benefit">+₩12.13</Tag1>
          </PriceWrap>
        </Card>
        <Card direction="row" columnGap={6} padding="10px 16px">
          <UsageProfile>420</UsageProfile>
          <HouseholdNames>
            <H5 className="dong">101동</H5>
            <Tag1 className="ho">1000호</Tag1>
          </HouseholdNames>
          <LineWrap>
            <Shadowing />
            <Line datas={[1, 2, 3, 4, 5, 6]} />
          </LineWrap>
          <PriceWrap>
            <H5 className="price">₩82,755.27</H5>
            <Tag1 className="compare benefit">+₩12.13</Tag1>
          </PriceWrap>
        </Card>
        <Card direction="row" columnGap={6} padding="10px 16px">
          <UsageProfile>420</UsageProfile>
          <HouseholdNames>
            <H5 className="dong">101동</H5>
            <Tag1 className="ho">1000호</Tag1>
          </HouseholdNames>
          <LineWrap>
            <Shadowing />
            <Line datas={[1, 2, 3, 4, 5, 6]} />
          </LineWrap>
          <PriceWrap>
            <H5 className="price">₩82,755.27</H5>
            <Tag1 className="compare benefit">+₩12.13</Tag1>
          </PriceWrap>
        </Card>
        <Card direction="row" columnGap={6} padding="10px 16px">
          <UsageProfile>420</UsageProfile>
          <HouseholdNames>
            <H5 className="dong">101동</H5>
            <Tag1 className="ho">1000호</Tag1>
          </HouseholdNames>
          <LineWrap>
            <Shadowing />
            <Line datas={[1, 2, 3, 4, 5, 6]} />
          </LineWrap>
          <PriceWrap>
            <H5 className="price">₩82,755.27</H5>
            <Tag1 className="compare benefit">+₩12.13</Tag1>
          </PriceWrap>
        </Card>
        <Card direction="row" columnGap={6} padding="10px 16px">
          <UsageProfile>420</UsageProfile>
          <HouseholdNames>
            <H5 className="dong">101동</H5>
            <Tag1 className="ho">1000호</Tag1>
          </HouseholdNames>
          <LineWrap>
            <Shadowing />
            <Line datas={[1, 2, 3, 4, 5, 6]} />
          </LineWrap>
          <PriceWrap>
            <H5 className="price">₩82,755.27</H5>
            <Tag1 className="compare benefit">+₩12.13</Tag1>
          </PriceWrap>
        </Card>
        <Card direction="row" columnGap={6} padding="10px 16px">
          <UsageProfile>420</UsageProfile>
          <HouseholdNames>
            <H5 className="dong">101동</H5>
            <Tag1 className="ho">1000호</Tag1>
          </HouseholdNames>
          <LineWrap>
            <Shadowing />
            <Line datas={[1, 2, 3, 4, 5, 6]} />
          </LineWrap>
          <PriceWrap>
            <H5 className="price">₩82,755.27</H5>
            <Tag1 className="compare benefit">+₩12.13</Tag1>
          </PriceWrap>
        </Card>
        <Card direction="row" columnGap={6} padding="10px 16px">
          <UsageProfile>420</UsageProfile>
          <HouseholdNames>
            <H5 className="dong">101동</H5>
            <Tag1 className="ho">1000호</Tag1>
          </HouseholdNames>
          <LineWrap>
            <Shadowing />
            <Line datas={[1, 2, 3, 4, 5, 6]} />
          </LineWrap>
          <PriceWrap>
            <H5 className="price">₩82,755.27</H5>
            <Tag1 className="compare benefit">+₩12.13</Tag1>
          </PriceWrap>
        </Card>
        <Card direction="row" columnGap={6} padding="10px 16px">
          <UsageProfile>420</UsageProfile>
          <HouseholdNames>
            <H5 className="dong">101동</H5>
            <Tag1 className="ho">1000호</Tag1>
          </HouseholdNames>
          <LineWrap>
            <Shadowing />
            <Line datas={[1, 2, 3, 4, 5, 6]} />
          </LineWrap>
          <PriceWrap>
            <H5 className="price">₩82,755.27</H5>
            <Tag1 className="compare benefit">+₩12.13</Tag1>
          </PriceWrap>
        </Card>
      </CardColGroup>
    </Wrap>
  );
}

const Wrap = styled.div`
  color: ${white[900]};
  margin: 0 0 64px;
  & > p {
    margin: 0 0 12px;
  }
`;

const HouseholdNames = styled.div`
  & > .ho {
    color: ${white[100]};
  }
  display: flex;
  flex-direction: column;
  row-gap: 2px;
`;

const LineWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 64px;

  & > .line {
    width: 85%;
    height: 32px;
  }
`;

const Shadowing = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 15%;
  height: 100%;

  background: linear-gradient(
    90deg,
    #12254c 57.41%,
    rgba(18, 37, 76, 0) 99.29%
  );
`;

const PriceWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export default BuyerList;

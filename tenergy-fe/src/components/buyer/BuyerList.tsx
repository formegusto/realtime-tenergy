import { Line } from "@component/common/chart";
import { Card, CardColGroup } from "@component/common/container";
import { UsageProfile } from "@component/common/etc";
import { white } from "@styles/colors";
import { H5, Tag1 } from "@styles/typo";
import styled from "styled-components";
import _ from "lodash";
import { BuyerItemProps } from "./types";

function BuyerList({ datas, onClick }: BuyerItemProps) {
  return (
    <Wrap>
      <Tag1>거래 추천 가구</Tag1>
      <CardColGroup>
        {datas?.map((data, idx) => (
          <Card
            onClick={onClick}
            key={`buyer-table-col-${idx}`}
            direction="row"
            columnGap={6}
            padding="10px 16px"
            isCursor
          >
            <UsageProfile>
              {Math.round(
                _.nth(
                  _.map(data.history, ({ value }) => value),
                  -1
                )!
              )}
            </UsageProfile>
            <HouseholdNames>
              <H5 className="dong">{data.name.split("-")[1]}동</H5>
              <Tag1 className="ho">{data.name.split("-")[2]}호</Tag1>
            </HouseholdNames>
            <LineWrap>
              <Shadowing />
              <Line datas={_.map(data.history, ({ value }) => value)} />
            </LineWrap>
            <PriceWrap>
              <H5 className="price">
                ₩{data.nowPrice.toLocaleString("ko-KR")}
              </H5>
              <Tag1 className={`compare ${data.err < 0 ? "loss" : "benefit"}`}>
                {data.err > 0 && "+"}₩{data.err.toLocaleString("ko-KR")}
              </Tag1>
            </PriceWrap>
          </Card>
        ))}
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

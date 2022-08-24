import { Line } from "@component/common/chart";
import { Card, CardColGroup, CardRowGroup } from "@component/common/container";
import { UsageProfile } from "@component/common/etc";
import { white } from "@styles/colors";
import { H5, Tag1 } from "@styles/typo";
import styled from "styled-components";
import _ from "lodash";
import { SellerItemProps } from "./types";

function SellerList({ datas, onClick }: SellerItemProps) {
  return (
    <Wrap>
      <Tag1>거래 가능 판매자</Tag1>
      <CardColGroup>
        {datas?.map((data, idx) => (
          <CardRowGroup key={`seller-table-row-${idx}`}>
            {data.map(({ _id, kwh, name }) => (
              <Card
                padding="16px 12px"
                key={`seller-${_id}`}
                onClick={() => onClick(name)}
                isCursor
              >
                <HouseholdInformation>
                  <UsageProfile>
                    {Math.round(
                      _.nth(
                        _.map(kwh, ({ value }) => value),
                        -1
                      )!
                    )}
                  </UsageProfile>
                  <HouseholdNames>
                    <H5 className="dong">{name.split("-")[1]}동</H5>
                    <Tag1 className="ho">{name.split("-")[2]}호</Tag1>
                  </HouseholdNames>
                </HouseholdInformation>
                <Line datas={_.map(kwh, ({ value }) => value)} />
              </Card>
            ))}
          </CardRowGroup>
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

  & .line {
    margin: 16px 0;
    height: 30px;
  }
`;

const HouseholdInformation = styled.div`
  display: flex;
  column-gap: 6px;
`;

const HouseholdNames = styled.div`
  & > .ho {
    color: ${white[100]};
  }
  display: flex;
  flex-direction: column;
  row-gap: 2px;
  flex: 1;
`;

export default SellerList;

import { Price } from "@api/types";
import { BasicPie } from "@component/common/chart";
import { Card, CardColGroup } from "@component/common/container";
import { white } from "@styles/colors";
import { H4 } from "@styles/typo";
import styled from "styled-components";
import ChartInformation from "./ChartInformation";
import _ from "lodash";

type Props = { price: Price };
function PriceInformation({ price }: Props) {
  return (
    <Wrap>
      <BasicPie
        datas={_.map(
          ["householdPrice", "tradePrice", "publicPrice"],
          (key) => (price as any)[key]
        )}
      />
      <CardColGroup className="price-text-wrap">
        <ChartInformation />
        <Card className="last-price" backgroundColor="public" rowGap={10}>
          <H4>전기요금</H4>
          <H4>₩ {price.bill.toLocaleString("ko-KR")}</H4>
        </Card>
      </CardColGroup>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 16px;
  margin: 0 12px;

  color: ${white[900]};

  & > .price-text-wrap {
    flex: 1;
  }

  & > .pie {
    width: 150px;
    height: 150px;
  }

  .last-price {
    justify-content: center;
    align-items: center;

    h4 {
      text-align: center;
    }

    h4:nth-child(1) {
      color: ${white[100]};
    }
    h4:nth-child(2) {
    }
  }
`;

export default PriceInformation;

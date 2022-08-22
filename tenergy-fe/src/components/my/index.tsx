import styled from "styled-components";
import IntegratedInformation from "./IntegratedInformation";
import UsageHistory from "./UsageHistory";
import PriceInformation from "./PriceInformation";
import { ResGetMy } from "@api/types";

type Props = {
  data: ResGetMy;
};

export function MyComponent({ data }: Props) {
  return (
    <Wrap>
      <UsageHistory meter={data.meter} history={data.history} />
      <IntegratedInformation
        meter={data.meter}
        price={data.price}
        distribution={data.distribution}
      />
      <PriceInformation price={data.price} />
    </Wrap>
  );
}

const Wrap = styled.div`
  & > .usage-history {
    padding-left: 12px;
    padding-right: 12px;

    & > .line {
      margin: 12px 0 24px;
      width: 100%;
      height: 92px;
    }
  }
`;

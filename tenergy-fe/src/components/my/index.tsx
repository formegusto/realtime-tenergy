import styled from "styled-components";
import IntegratedInformation from "./IntegratedInformation";
import UsageHistory from "./UsageHistory";
import PriceInformation from "./PriceInformation";
import { InformationProps, MyComponentProps } from "./types";

export function MyComponent({
  data,
  listOpen,
  infoOpen,
}: MyComponentProps & InformationProps) {
  return (
    <Wrap>
      <UsageHistory meter={data.meter} history={data.history} />
      <IntegratedInformation
        listOpen={listOpen}
        infoOpen={infoOpen}
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

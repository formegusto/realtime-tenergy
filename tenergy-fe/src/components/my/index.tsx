import styled from "styled-components";
import IntegratedInformation from "./IntegratedInformation";
import UsageHistory from "./UsageHistory";
import PriceInformation from "./PriceInformation";
import { InformationProps, MyComponentProps } from "./types";
import _ from "lodash";

export function MyComponent({
  data,
  listOpen,
  infoOpen,
}: MyComponentProps & InformationProps) {
  return (
    <Wrap>
      <UsageHistory
        meter={data.meter}
        history={_.map(data.history, ({ value }) => value)}
      />
      <IntegratedInformation
        listOpen={listOpen}
        infoOpen={infoOpen}
        kwh={
          _.nth(
            _.map(data.history, ({ value }) => value),
            -1
          )!
        }
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

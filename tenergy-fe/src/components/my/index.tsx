import styled from "styled-components";
import IntegratedInformation from "./IntegratedInformation";
import UsageHistory from "./UsageHistory";

export function MyComponent() {
  return (
    <Wrap>
      <UsageHistory />
      <IntegratedInformation />
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

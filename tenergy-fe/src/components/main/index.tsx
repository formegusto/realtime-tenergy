import { white } from "@styles/colors";
import styled from "styled-components";
import APTInformation from "./APTInformation";
import MarketStatus from "./MarketStatus";

export function MainComponent() {
  return (
    <Wrap>
      <APTInformation />
      <MarketStatus />
    </Wrap>
  );
}

const Wrap = styled.div`
  & .title {
    color: ${white[100]};
    letter-spacing: 0.1em;

    margin: 0 0 12px;
  }
`;

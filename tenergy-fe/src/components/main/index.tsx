import { KETI } from "@component/common";
import { other, white } from "@styles/colors";
import { fontStyles } from "@styles/typo/styles";
import styled from "styled-components";
import APTInformation from "./APTInformation";
import MarketStatus from "./MarketStatus";
import PublicDistributor from "./PublicDistributor";

export function MainComponent() {
  return (
    <Wrap>
      <APTInformation />
      <MarketStatus />
      <PublicDistributor />
      <KETI className="org" />
    </Wrap>
  );
}

const Wrap = styled.div`
  padding: 0 0 50px;

  .distribute-table {
    & .group-price {
      ${fontStyles["tag2"]}
      margin: 0 10px 0 0;
    }
    & .compare {
      font-weight: 500;
      font-size: 8px;
      line-height: 10px;

      letter-spacing: 0.1em;
    }
    & .benefit {
      color: ${other["lightgreen"]};
    }
    & .loss {
      color: ${other["lightred"]};
    }
  }

  & > .org {
    color: ${white[900]};
    text-align: center;

    margin: 16px 0 0;
  }
`;

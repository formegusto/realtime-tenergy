import { white } from "@styles/colors";
import { fontStyles } from "@styles/typo/styles";
import React from "react";
import styled from "styled-components";

function RequestUsage({ children }: React.PropsWithChildren<any>) {
  return (
    <Wrap>
      <Content>
        <span className="value">{children}</span>
        <span className="unit">kWh</span>
      </Content>
    </Wrap>
  );
}

const Wrap = styled.div`
  padding: 36px 0 48px;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 2px;
  color: ${white[900]};

  width: 128px;
  height: 128px;

  border-radius: 100%;
  border: 2px solid ${white[900]};

  ${fontStyles["h1"]}

  & > .unit {
    ${fontStyles["h2"]}
  }
`;

export default RequestUsage;

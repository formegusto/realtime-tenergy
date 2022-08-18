import { white } from "@styles/colors";
import styled from "styled-components";

export * from "./auth";
export * from "./main";
export * from "./seller";

export const Wrapper = styled.main`
  width: 100%;
  height: calc(100vh - 116px);

  margin: 60px 0 56px;

  overflow-y: scroll;

  .title {
    color: ${white[100]};
    letter-spacing: 0.1em;

    margin: 0 0 12px;
  }
`;

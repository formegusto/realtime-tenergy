import { white } from "@styles/colors";
import styled from "styled-components";

export * from "./auth";
export * from "./main";
export * from "./seller";
export * from "./buyer";
export * from "./public";
export * from "./my";
export * from "./trade";

export const Wrapper = styled.main`
  width: 100%;
  /* height: calc(var(--vh) * 100 - 60px - 56px - 48px); */

  margin: 60px 0 90px;

  /* overflow-y: scroll; */

  .title {
    color: ${white[100]};
    letter-spacing: 0.1em;

    margin: 0 0 12px;
  }
`;

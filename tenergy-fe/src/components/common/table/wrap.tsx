import { fontStyles } from "@styles/typo/styles";
import styled from "styled-components";
import { TableStyleProps } from "./types";

export const Table = styled.table<TableStyleProps>`
  width: 100%;
  ${({ fontStyle }) => (fontStyle ? fontStyles[fontStyle] : fontStyles["tag2"])}

  & th, td {
    padding: ${({ padding }) => (padding ? padding : "10px 12px")};
  }
`;

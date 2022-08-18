import { fontStyles } from "@styles/typo/styles";
import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  ${fontStyles["tag2"]}

  & th, td {
    padding: 10px 12px;
  }
`;

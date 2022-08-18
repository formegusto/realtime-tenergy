import { blue } from "@styles/colors";
import styled, { css } from "styled-components";
import { CardStyleProps } from "./types";

export const CardColGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  row-gap: 12px;
`;

export const CardRowGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  column-gap: 16px;
`;

export const Card = styled.div<CardStyleProps>`
  ${({ padding }) =>
    padding
      ? css`
          padding: ${padding};
        `
      : css`
          padding: 8px 10px;
        `}
  flex: 1;

  display: flex;
  flex-direction: column;

  background-color: ${blue[500]};

  cursor: pointer;
  border-radius: 8px;
`;

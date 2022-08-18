import styled, { css } from "styled-components";
import {
  cardBackgroundPalette,
  CardGroupStyleProps,
  CardStyleProps,
} from "./types";

export const CardColGroup = styled.div<CardGroupStyleProps>`
  width: 100%;
  display: flex;
  flex-direction: column;

  row-gap: 12px;

  ${({ columnGap }) =>
    columnGap &&
    css`
      column-gap: ${columnGap}px;
    `}
  ${({ rowGap }) =>
    rowGap &&
    css`
      row-gap: ${rowGap}px;
    `}
`;

export const CardRowGroup = styled.div<CardGroupStyleProps>`
  width: 100%;
  display: flex;
  flex-direction: row;

  ${({ columnGap }) =>
    columnGap
      ? css`
          column-gap: ${columnGap}px;
        `
      : css`
          column-gap: 16px;
        `}
  ${({ rowGap }) =>
    rowGap &&
    css`
      row-gap: ${rowGap}px;
    `}
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
  ${({ direction }) =>
    direction
      ? css`
          flex-direction: ${direction};
        `
      : css`
          flex-direction: column;
        `}

  ${({ columnGap }) =>
    columnGap &&
    css`
      column-gap: ${columnGap}px;
    `}
  ${({ rowGap }) =>
    rowGap &&
    css`
      row-gap: ${rowGap}px;
    `}

  display: flex;

  ${({ backgroundColor }) =>
    backgroundColor
      ? css`
          background-color: ${cardBackgroundPalette[backgroundColor]};
        `
      : css`
          background-color: ${cardBackgroundPalette["blue"]};
        `}

  /* cursor: pointer; */
  border-radius: 8px;
  /* box-sizing: border-box; */
`;

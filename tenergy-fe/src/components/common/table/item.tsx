import { white } from "@styles/colors";
import styled, { css } from "styled-components";
import {
  TableColumnStyleProps,
  TableHeadStyleProps,
  TableRowStyleProps,
} from "./types";

export const TableHead = styled.thead<TableHeadStyleProps>`
  ${({ fontDensity }) =>
    fontDensity
      ? css`
          color: ${white[fontDensity]};
        `
      : css`
          color: ${white[100]};
        `}

  border-bottom: 1px solid ${white[500]};
`;

export const TableHeadRow = styled.tr``;

export const TableHeadCol = styled.th<TableColumnStyleProps>`
  text-align: ${({ isCenter }) => (isCenter ? "center" : "left")};
`;

export const TableBody = styled.tbody`
  color: ${white[900]};
`;

export const TableBodyRow = styled.tr<TableRowStyleProps>`
  ${({ isCursor }) =>
    isCursor &&
    css`
      cursor: pointer;
    `}
`;

export const TableBodyCol = styled.td<TableColumnStyleProps>`
  text-align: ${({ isCenter }) => (isCenter ? "center" : "left")};
`;

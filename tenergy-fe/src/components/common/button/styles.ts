import { blue, other } from "@styles/colors";
import { css } from "styled-components";
import { Colors } from "./types";

export const block = css`
  display: block;
  width: 100%;
`;

export const colors: Colors = {
  blue: css`
    background-color: ${blue[900]};
  `,
  red: css`
    background-color: ${other["lightred"]};
  `,
  green: css`
    background-color: ${other["green"]};
  `,
  darkgreen: css`
    background-color: ${other["darkgreen"]};
  `,
  transparent: css`
    background-color: transparent;
  `,
};

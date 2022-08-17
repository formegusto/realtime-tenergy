import { FlattenSimpleInterpolation } from "styled-components";

export type ColorTheme = "blue" | "green" | "red" | "transparent";

export type ButtonStyleProps = {
  isBlock?: boolean;
  colorTheme?: ColorTheme;
};

export type Colors = {
  [key in ColorTheme]?: FlattenSimpleInterpolation;
};

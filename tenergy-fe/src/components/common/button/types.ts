import { FlattenSimpleInterpolation } from "styled-components";

export type ColorTheme =
  | "blue"
  | "lightblue"
  | "green"
  | "darkgreen"
  | "red"
  | "transparent";

export type ButtonStyleProps = {
  isBlock?: boolean;
  colorTheme?: ColorTheme;
};

export type Colors = {
  [key in ColorTheme]?: FlattenSimpleInterpolation;
};

export type ButtonGroupStyleProps = {
  nonFlex?: boolean;
};

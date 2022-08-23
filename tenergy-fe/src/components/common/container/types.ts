import { blue, chartPalette, other } from "@styles/colors";

export type TopContainerStyleProps = {
  isRadius?: boolean;
  isShadow?: boolean;
};

export type CardGroupStyleProps = {
  isWrap?: boolean;
  columnGap?: number;
  rowGap?: number;
};

export type CardStyleProps = {
  padding?: string;
  direction?: "column" | "row";
  // justify?: string;
  // align?: string;
  columnGap?: number;
  rowGap?: number;
  backgroundColor?: CardBackgroundColor;
  isCursor?: boolean;
};

export type CardBackgroundColor =
  | "blue"
  | "transparent"
  | "deepblue"
  | "trading"
  | "darkgreen"
  | "public";

export type CardBackgroundPalette = {
  [key in CardBackgroundColor]: string;
};

export const cardBackgroundPalette: CardBackgroundPalette = {
  blue: blue[500]!,
  transparent: "transparent",
  deepblue: blue[100]!,
  trading: chartPalette["trading"]!,
  public: chartPalette["public"]!,
  darkgreen: other["darkgreen"]!,
};

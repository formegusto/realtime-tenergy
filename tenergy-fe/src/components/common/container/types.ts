import { blue } from "@styles/colors";

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
  columnGap?: number;
  rowGap?: number;
  backgroundColor?: CardBackgroundColor;
};

export type CardBackgroundColor = "blue" | "transparent" | "deepblue";

export type CardBackgroundPalette = {
  [key in CardBackgroundColor]: string;
};

export const cardBackgroundPalette: CardBackgroundPalette = {
  blue: blue[500]!,
  transparent: "transparent",
  deepblue: blue[100]!,
};

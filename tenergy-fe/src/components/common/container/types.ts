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

export type CardBackgroundColor = "blue" | "transparent";

export type CardBackgroundPalette = {
  [key in "blue" | "transparent"]: string;
};

export const cardBackgroundPalette: CardBackgroundPalette = {
  blue: blue[500]!,
  transparent: "transparent",
};

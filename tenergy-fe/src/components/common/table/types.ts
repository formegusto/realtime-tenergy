import { Font } from "@styles/typo/types";

export type TableStyleProps = {
  fontStyle?: Font;
  padding?: string;
};

export type TableHeadStyleProps = {
  fontDensity?: 100 | 500 | 900;
};

export type TableColumnStyleProps = {
  isCenter?: boolean;
};

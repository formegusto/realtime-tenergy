export type ColorKey =
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | string;
export type Color = {
  [key in ColorKey]?: string;
};

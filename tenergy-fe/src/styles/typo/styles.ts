import { css } from "styled-components";
import { FontStyles } from "./types";

export const heading: FontStyles = {
  h1: css`
    font-weight: 700;
    font-size: 22px;
    line-height: 28px;
  `,
  h2: css`
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
  `,
  h3: css`
    font-weight: 400;
    font-size: 18px;
    line-height: 23px;
  `,
  h4: css`
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
  `,
  h5: css`
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
  `,
};

export const paragraph: FontStyles = {
  p1: css`
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
  `,
  p2: css`
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
  `,
};

export const tag: FontStyles = {
  tag1: css`
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
  `,
  tag2: css`
    font-weight: 500;
    font-size: 10px;
    line-height: 13px;
  `,
};

export const fontStyles: FontStyles = {
  ...heading,
  ...paragraph,
  ...tag,
};

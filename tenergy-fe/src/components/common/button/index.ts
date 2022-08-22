import { white } from "@styles/colors";
import { fontStyles } from "@styles/typo/styles";
import styled, { css } from "styled-components";
import { block, colors } from "./styles";
import { ButtonGroupStyleProps, ButtonStyleProps } from "./types";

export const CircleButton = styled.button<ButtonStyleProps>`
  width: 64px;
  height: 64px;
  ${({ colorTheme }) => (colorTheme ? colors[colorTheme] : colors["blue"])}

  border-radius: 100%;
  outline: none;
  border: none;

  color: ${white[900]};
  ${fontStyles["h5"]}
  &:hover {
    opacity: 0.9;
  }
  cursor: pointer;
  transition: 0.2s;
`;

export const Button = styled.button<ButtonStyleProps>`
  ${fontStyles["h4"]}
  ${({ isBlock }) => isBlock && block}

  padding: 12px 0px;
  border-radius: 8px;

  ${({ colorTheme }) => (colorTheme ? colors[colorTheme] : colors["blue"])}
  color: ${white[900]};

  outline: none;
  border: none;

  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const ButtonGroup = styled.div<ButtonGroupStyleProps>`
  display: flex;
  width: 100%;
  column-gap: 12px;
  justify-content: center;
  align-items: center;

  & > button {
    ${({ nonFlex }) =>
      !nonFlex &&
      css`
        flex: 1;
      `};
  }
`;

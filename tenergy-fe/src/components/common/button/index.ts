import { white } from "@styles/colors";
import { fontStyles } from "@styles/typo/styles";
import styled from "styled-components";
import { block, colors } from "./styles";
import { ButtonStyleProps } from "./types";

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

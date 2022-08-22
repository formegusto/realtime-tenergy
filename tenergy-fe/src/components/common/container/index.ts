import { blue } from "@styles/colors";
import styled, { css } from "styled-components";
import { TopContainerStyleProps } from "./types";

export const TopContainer = styled.div<TopContainerStyleProps>`
  padding: 32px 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${blue[100]};

  ${({ isRadius }) =>
    isRadius &&
    css`
      border-bottom-left-radius: 16px;
      border-bottom-right-radius: 16px;
    `}
  ${({ isShadow }) =>
    isShadow &&
    css`
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    `}
`;

export const SubContainer = styled.div`
  padding: 0 0 32px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export * from "./card";
export * from "./modal";

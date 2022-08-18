import { fontStyles } from "@styles/typo/styles";
import styled, { StyledComponentProps } from "styled-components";

export function KETI(props: StyledComponentProps<"p", any, {}, never>) {
  return (
    <Logo {...props}>
      <span>K</span>orea <span>E</span>lectronics <span>T</span>echnology{" "}
      <span>I</span>nstitute
    </Logo>
  );
}

const Logo = styled.p`
  ${fontStyles["p2"]}
  font-weight: 100;
  letter-spacing: 0.02em;

  & > span {
    font-weight: 900;
  }
`;

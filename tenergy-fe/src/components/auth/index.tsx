import { Splash } from "@component/common";
import { Button } from "@component/common/button";
import styled from "styled-components";
import { AuthProps } from "./types";

export * from "./LoginComponent";
export function AuthComponent(props: AuthProps) {
  return (
    <>
      <Wrap>
        <Splash logoAnimation={false} absolute />
        <Button onClick={props.navigateLogin} colorTheme="transparent">
          Log In to Household Account
        </Button>
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  &.right-exit-active {
    & > button {
      display: none;
    }
  }

  position: absolute;
  /* top: 0;
  left: 0; */

  width: 100%;
  height: 100%;

  z-index: 255;

  & > button {
    width: calc(100% - 32px);
    position: absolute;
    bottom: 48px;
    left: 0;
    right: 0;

    margin: 0 auto;
  }
`;

export default AuthComponent;

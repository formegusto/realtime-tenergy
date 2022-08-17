import { Button } from "@component/common/button";
import { H4 } from "@styles/typo";
import styled from "styled-components";
import { Props } from "./types";

export * from "./LoginComponent";
export function AuthComponent(props: Props) {
  return (
    <Wrap>
      <Button onClick={props.navigateLogin}>
        <H4>Log In to Household Account</H4>
      </Button>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: fixed;

  width: 100vw;
  height: 100vh;

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

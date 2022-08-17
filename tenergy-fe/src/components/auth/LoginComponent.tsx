import { NavigateHeader } from "@component/common";
import styled from "styled-components";

export function LoginComponent() {
  return (
    <Wrap>
      <NavigateHeader title="Log In" />
    </Wrap>
  );
}

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;
`;

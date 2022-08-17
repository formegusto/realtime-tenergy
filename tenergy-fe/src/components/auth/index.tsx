import styled from "styled-components";

export function AuthComponent() {
  return <Wrap></Wrap>;
}

const Wrap = styled.div`
  position: fixed;

  width: 100vw;
  height: 100vh;

  z-index: 255;
  background-color: #fff;
`;

export default AuthComponent;

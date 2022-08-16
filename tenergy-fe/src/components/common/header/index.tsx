import styled from "styled-components";

export function Header() {
  return <Wrap>헤더</Wrap>;
}

const Wrap = styled.header`
  display: flex;
  align-items: center;

  width: calc(100% - 24px);
  height: 60px;

  padding: 0 12px;
`;

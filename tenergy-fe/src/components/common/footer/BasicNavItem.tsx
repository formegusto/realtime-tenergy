import styled from "styled-components";
import { NavItemProps } from "./types";

function BasicNavItem({ item }: NavItemProps) {
  return <Wrap></Wrap>;
}

const Wrap = styled.nav`
  display: flex;
  flex-direction: column;

  justify-content: center;
`;

export default BasicNavItem;

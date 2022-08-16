import { white } from "@styles/colors";
import styled from "styled-components";
import BasicNavItem from "./BasicNavItem";
import { navigationItems } from "./types";

export function Footer() {
  return (
    <Wrap>
      {navigationItems.map((item) => (
        <BasicNavItem key={`nav-${item.title}`} item={item} />
      ))}
    </Wrap>
  );
}

const Wrap = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;

  width: 100%;
  background-color: ${white[900]};

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

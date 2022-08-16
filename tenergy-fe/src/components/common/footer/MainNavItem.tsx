import { blue } from "@styles/colors";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Tenergy } from "../icons";
import { NavItemProps } from "./types";

function MainNavItem({ item }: NavItemProps) {
  const navigate = useNavigate();
  return (
    <Wrap onClick={() => navigate(item.path)}>
      <Tenergy size={36} animation />
    </Wrap>
  );
}

const Wrap = styled.nav`
  /* padding: 10px; */

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 28px;

  width: 56px;
  height: 56px;
  background-color: ${blue[300]};
  transform: translateY(-24px);
  transition: 0.25s;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);

  cursor: pointer;

  &:hover {
    transform: translateX(-2px) translateY(-26px);
  }
`;

export default MainNavItem;

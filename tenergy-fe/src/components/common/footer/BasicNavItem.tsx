import { blue } from "@styles/colors";
import { Tag1 } from "@styles/typo";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NavItemProps } from "./types";

function BasicNavItem({ item }: NavItemProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.pathname === item.path;

  return (
    <Wrap
      onClick={() => navigate(item.path)}
      className={`nav-item ${active ? "active" : ""}`}
    >
      {item.icon && <item.icon size={24} />}

      <Tag1>{item.title}</Tag1>
    </Wrap>
  );
}

const Wrap = styled.nav`
  display: flex;
  flex-direction: column;
  row-gap: 2px;

  align-items: center;
  width: 76px;
  padding: 4px 0 8px;

  color: #bbb;

  cursor: pointer;

  &:hover,
  &.active {
    color: ${blue[900]};
  }
`;

export default BasicNavItem;

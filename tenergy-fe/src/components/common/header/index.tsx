import styled from "styled-components";
import { MdMiscellaneousServices } from "react-icons/md";
import { blue, white } from "@styles/colors";
import SimpleProfile from "./SimpleProfile";

export * from "./NavigateHeader";

export function Header() {
  return (
    <Wrap>
      <MdMiscellaneousServices size={24} />
      <SimpleProfile />
    </Wrap>
  );
}

const Wrap = styled.header`
  position: fixed;

  left: 0;
  top: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: calc(100% - 24px);
  height: 60px;

  padding: 0 12px;

  color: ${white[900]};
  background-color: ${blue[100]};
`;

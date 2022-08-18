import styled from "styled-components";
import PublicPrice from "./PublicPrice";
import SelectedGroup from "./SelectedGroup";

export function PublicComponent() {
  return (
    <Wrap>
      <PublicPrice />
      <SubContent>
        <SelectedGroup />
      </SubContent>
    </Wrap>
  );
}

const Wrap = styled.div``;

const SubContent = styled.div`
  padding: 0 12px;
`;

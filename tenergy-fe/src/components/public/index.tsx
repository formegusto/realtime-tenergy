import styled from "styled-components";
import GroupStatus from "./GroupStatus";
import PrivatePrice from "./PrivatePrice";
import PublicPrice from "./PublicPrice";
import SelectedGroup from "./SelectedGroup";

export function PublicComponent() {
  return (
    <Wrap>
      <PublicPrice />
      <SubContent>
        <SelectedGroup />
        <PrivatePrice />
        <GroupStatus />
      </SubContent>
    </Wrap>
  );
}

const Wrap = styled.div``;

const SubContent = styled.div`
  padding: 0 12px;
`;

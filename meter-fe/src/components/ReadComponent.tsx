import { Control } from "@store/types";
import styled from "styled-components";

type Props = {
  controls?: Control[];
  selectControl: (_id: string) => void;
};

function ReadComponent({ controls, selectControl }: Props) {
  return (
    <List>
      {controls?.map((control) => (
        <Item key={control._id} onClick={() => selectControl(control._id)}>
          {control._id}
        </Item>
      ))}
    </List>
  );
}

const List = styled.ul``;
const Item = styled.li`
  cursor: pointer;
`;

export default ReadComponent;

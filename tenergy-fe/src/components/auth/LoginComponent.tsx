import { Button } from "@component/common/button";
import { TextInput } from "@component/common/input";
import { white } from "@styles/colors";
import { H5 } from "@styles/typo";
import styled from "styled-components";

export function LoginComponent() {
  return (
    <Wrap>
      <Form>
        <Group>
          <H5>Your Household Name</H5>
          <TextInput type="text" name="name" autoFocus />
        </Group>
        <Button type="submit">Log In to Household Account</Button>
      </Form>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: absolute;
  width: calc(100vw - 32px);
  height: calc(100vh - 108px);

  padding: 108px 16px 0;

  color: ${white[900]};
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;

  & > input[name="name"] {
    margin: 10px 0 0;
  }

  flex: 1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;

  & > button[type="submit"] {
    margin: 0 0 48px;
  }
`;

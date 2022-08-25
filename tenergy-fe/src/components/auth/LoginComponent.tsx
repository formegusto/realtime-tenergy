import { Button } from "@component/common/button";
import { TextInput } from "@component/common/input";
import { white } from "@styles/colors";
import { H5 } from "@styles/typo";
import styled from "styled-components";
import { LoginProps } from "./types";

export function LoginComponent(props: LoginProps) {
  return (
    <Wrap>
      <Form onSubmit={props.onSubmit}>
        <Group>
          <H5>Your Household Name</H5>
          <TextInput
            type="text"
            name="name"
            onChange={props.changeName}
            autoFocus
          />
        </Group>
        <Button type="submit">Log In to Household Account</Button>
      </Form>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  max-width: 500px;

  padding: 108px 16px 0;
  box-sizing: border-box;

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

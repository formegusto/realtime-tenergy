import { NavigateHeader } from "@component/common";
import { TextInput } from "@component/common/input";
import { white } from "@styles/colors";
import { H5 } from "@styles/typo";
import styled from "styled-components";

export function LoginComponent() {
  return (
    <Wrap>
      <NavigateHeader title="Log In" />
      <Form>
        <H5>Your Household Name</H5>
        <TextInput />
      </Form>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: calc(100vw - 32px);
  height: calc(100vh - 108px);

  padding: 108px 16px 0;

  color: ${white[900]};
`;

const Form = styled.form`
  display: flex;

  flex-direction: column;
`;

import { other, white } from "@styles/colors";
import { P2 } from "@styles/typo";
import { fontStyles } from "@styles/typo/styles";

import React from "react";
import styled, { keyframes } from "styled-components";
import { FormProps } from "./types";

export function AlertWrap({ children }: React.PropsWithChildren<any>) {
  return <Wrap>{children}</Wrap>;
}

const Wrap = styled.div`
  position: fixed;
  top: 12px;
  right: 0;
  left: 0;

  margin: 0 auto;

  width: (100vw - 96px);
  max-width: 404px;

  display: flex;
  flex-direction: column-reverse;
  row-gap: 12px;

  z-index: 255;
`;

export function AlertForm({ alert, onSelected }: FormProps) {
  const [view, setView] = React.useState<boolean>(true);

  React.useEffect(() => {
    setTimeout(() => {
      setView(false);
    }, 3000);
  }, []);

  return view ? (
    <Form onClick={() => onSelected(alert.id)}>
      <P2>{alert.message}</P2>
    </Form>
  ) : (
    <></>
  );
}

const FormAnimation = keyframes`
    from {
        height: 0;
    } to {
        height: 40px;
    }
`;

const Form = styled.div`
  cursor: pointer;

  position: relative;

  width: 100%;
  height: 40px;

  transform-origin: 0% 50%;
  overflow-y: hidden;
  animation: ${FormAnimation} 0.2s ease-in-out forwards;
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${other["green"]};
  color: ${white["900"]};

  border-radius: 8px;

  box-shadow: 4px 0 0 rgba(0, 0, 0, 0.5);

  ${fontStyles["p2"]}
`;

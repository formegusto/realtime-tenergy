import { blue, white } from "@styles/colors";
import { P2 } from "@styles/typo";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Tenergy } from "../icons";
import { SplashInteractionProps } from "./types";

export function Splash(props: SplashInteractionProps) {
  const navigate = useNavigate();
  const onAnimationEnd = React.useCallback(() => {
    setTimeout(() => {
      navigate("/auth");
    }, 500);
  }, [navigate]);

  return (
    <Wrap>
      <Tenergy
        onAnimationEnd={onAnimationEnd}
        animation={props.logoAnimation}
      />
      <P2 className="org">
        <span>K</span>orea <span>E</span>lectronics <span>T</span>echnology{" "}
        <span>I</span>nstitute
      </P2>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${blue[100]};

  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: ${white[900]};

  & > p.org {
    margin: 8px 0 0;
    font-weight: 100;

    & > span {
      font-weight: 900;
    }
  }
`;

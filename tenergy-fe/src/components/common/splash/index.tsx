import { check } from "@api";
import { householdState, tokenState } from "@store/atom";
import { blue, white } from "@styles/colors";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled, { css } from "styled-components";
import { Tenergy } from "../icons";
import { KETI } from "../icons";
import { SplashInteractionProps, SplashStyleProps } from "./types";

export function Splash({
  logoAnimation,
  ...styleProps
}: SplashInteractionProps & SplashStyleProps) {
  const navigate = useNavigate();
  const setToken = useSetRecoilState(tokenState);
  const setHousehold = useSetRecoilState(householdState);
  const checkMutation = useMutation(["checkAuthQuery"], check, {
    onSuccess: ({ household }) => {
      setTimeout(() => {
        setHousehold(household);
      }, 1000);
    },
    onError: () => {
      localStorage.removeItem("token");
      setToken(null);
      navigate("/auth");
    },
  });

  const onAnimationEnd = React.useCallback(() => {
    const storageToken = localStorage.getItem("token");
    if (storageToken) {
      setToken(storageToken);
      checkMutation.mutate(storageToken);
    } else {
      setTimeout(() => {
        navigate("/auth");
      }, 700);
    }
  }, [navigate, checkMutation, setToken]);

  return (
    <Wrap {...styleProps}>
      <Tenergy onAnimationEnd={onAnimationEnd} animation={logoAnimation} />
      <KETI className="org" />
    </Wrap>
  );
}

const Wrap = styled.div<SplashStyleProps>`
  width: 100%;
  height: 100%;
  background-color: ${blue[100]};

  ${({ absolute }) =>
    absolute
      ? css`
          position: absolute;
          top: 0;
          left: 0;
        `
      : css`
          position: fixed;
          top: 0;
          left: 0;
          z-index: 200;
        `}

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: ${white[900]};

  & > p.org {
    margin: 8px 0 0;
  }
`;

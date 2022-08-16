import { white } from "@styles/colors";
import React from "react";
import styled, { css, keyframes } from "styled-components";
import { TenergyStyleOption } from "./types";

export function Tenergy(props: TenergyStyleOption) {
  return (
    <SVG viewBox="0 0 100 100" xmlns="https://www.w3.org/svg/2000" {...props}>
      <path
        className="stem"
        d="
            M 50 0
            C 50 0, 50 70, 50 70
            S 50 110, 90 80
        "
      />
      <g>
        <path
          className="leaf second"
          d="
              M 2.5 10
              S 5 60, 48.5 40
          "
        />
        <path
          className="leaf first"
          d="
              M 48.5 40
              S 48.5 0, 2.5 10 
          "
        />
      </g>
      <g>
        <path
          className="leaf first"
          d="
              M 51.5 40
              S 95 60, 97.5 10
          "
        />
        <path
          className="leaf second"
          d="
              M 97.5 10
              S 51.5 0, 51.5 40
          "
        />
      </g>
    </SVG>
  );
}

const stemAnimation = keyframes`
    from {
        stroke-dashoffset: 127px;
    } to {
        stroke-dashoffset: 0px;
    }
`;

const leafAnimation = keyframes`
    from {
        stroke-dashoffset: 70px;
    } to {
        stroke-dashoffset: 0px;
    }
`;

const SVG = styled.svg<TenergyStyleOption>`
  fill: none;
  stroke: ${white[900]};

  width: ${(props) => (props.size ? props.size : 100)}px;
  height: ${(props) => (props.size ? props.size : 100)}px;

  path.stem {
    stroke-width: 4px;
  }

  path.leaf {
    stroke-width: 1.5px;
  }

  ${(props) =>
    props.animation &&
    css`
      path.stem {
        stroke-width: 4px;
        stroke-dasharray: 127px;
        stroke-dashoffset: 127px;

        animation: ${stemAnimation} 0.35s linear forwards;
      }

      path.leaf {
        stroke-dasharray: 70px;
        stroke-dashoffset: 70px;

        &.first {
          animation: ${leafAnimation} 0.3s linear forwards;
          /* animation-delay: 0.65s; */
        }

        &.second {
          animation: ${leafAnimation} 0.3s linear forwards;
          /* animation-delay: 1.1s; */
        }
      }
    `}
`;

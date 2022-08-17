import { chartPalette, white } from "@styles/colors";
import React from "react";
import _ from "lodash";
import styled, { css } from "styled-components";
import { DoughnutInteractionProps, DoughnutStyleProps } from "./types";

const STROKEWIDTH = 10;
const RADIUS = 50 - STROKEWIDTH;
const [CENTER_X, CENTER_Y] = _.fill(new Array(2), RADIUS + STROKEWIDTH / 2);
const DIAMETER = 2 * Math.PI * RADIUS;

function GetCircle(
  color: string,
  fillSpace: number,
  emptySpace: number,
  offset: number,
  label: string
): SVGCircleElement {
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );

  circle.setAttribute("cx", CENTER_X.toString());
  circle.setAttribute("cy", CENTER_Y.toString());
  circle.setAttribute("r", RADIUS.toString());
  circle.setAttribute("fill", "transparent");
  circle.setAttribute("stroke", color);
  circle.setAttribute("stroke-width", STROKEWIDTH.toString());
  circle.setAttribute("stroke-dasharray", `${fillSpace} ${emptySpace}`);
  circle.setAttribute("stroke-dashoffset", -offset + "");
  circle.setAttribute("aria-label", label);

  return circle;
}

export function Doughnut({
  data,
  ...styleProps
}: DoughnutInteractionProps & DoughnutStyleProps) {
  const refSVG = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    while (refSVG.current?.hasChildNodes()) {
      refSVG.current.removeChild(refSVG.current.firstChild!);
    }

    const colors = [
      chartPalette["household"],
      chartPalette["trading"],
      chartPalette["public"],
    ];

    const acc = _.reduce(
      data,
      (prev, cur, idx) => _.concat(prev, prev[idx] + cur),
      [0]
    );
    const total = _.sum(data);

    _.forEach(data, (d, idx) => {
      const ratio = d / total;
      const offset = (acc[idx] / total) * DIAMETER - DIAMETER / 4;
      const fillSpace = DIAMETER * ratio;
      const emptySpace = DIAMETER - fillSpace;

      refSVG.current!.appendChild(
        GetCircle(
          colors[idx]!,
          fillSpace,
          emptySpace,
          offset,
          `circle-value-${d}`
        )
      );
    });
  }, [data]);

  return (
    <Wrap {...styleProps}>
      <svg
        width={styleProps.size ? styleProps.size : 100}
        height={styleProps.size ? styleProps.size : 100}
        ref={refSVG}
        viewBox={`0 0 ${RADIUS * 2 + STROKEWIDTH} ${RADIUS * 2 + STROKEWIDTH}`}
        xmlns="https://www.w3.org/2000/svg"
      />
      <Title>{_.sum(data)}</Title>
    </Wrap>
  );
}

const Wrap = styled.div<DoughnutStyleProps>`
  ${({ size }) =>
    size
      ? css`
          width: ${size}px;
          height: ${size}px;
        `
      : css`
          width: 100px;
          height: 100px;
        `}

  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;

  color: ${white[900]};
`;

const Title = styled.span`
  display: inline-block;
  position: absolute;

  font-weight: 700;
  font-size: 28px;
  line-height: 35px;
  letter-spacing: 0.1em;
`;

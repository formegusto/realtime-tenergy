import { chartPalette, white } from "@styles/colors";
import { fontStyles } from "@styles/typo/styles";
import React from "react";
import styled from "styled-components";
import { BarProps } from "./types";

const [VIEW_X, VIEW_Y] = [360, 160];
const MAX_Y = 120;
const TEXT_MARGIN = 20;
const TEXT_SIZE = 7.47;
const MARGIN_RATIO = 0.1;

export function Bar({ datas, selectedIdx }: BarProps) {
  const refSVG = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    if (refSVG.current) {
      while (refSVG.current?.hasChildNodes())
        refSVG.current.removeChild(refSVG.current.firstChild!);

      const margin = (VIEW_X / datas.length) * MARGIN_RATIO;
      const strokeWidth = (VIEW_X - margin * (datas.length - 1)) / datas.length;
      const startX = strokeWidth / 2;

      const x: Array<number> = [startX];
      for (let i = 1; i < datas.length; i++)
        x.push(x[i - 1] + margin + strokeWidth);

      const MAX = Math.max.apply(null, datas);
      const y: Array<number> = [];
      for (let i = 0; i < datas.length; i++) {
        const norm = (datas[i] - 0) / (MAX - 0);
        y.push(MAX_Y - MAX_Y * norm);
      }
      console.log(y);

      for (let i = 0; i < datas.length; i++) {
        const isSelected = i === selectedIdx;
        const path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        const d = ["M", x[i], MAX_Y, "L", x[i], y[i]];
        path.setAttribute("d", d.join(" "));
        path.setAttribute(
          "stroke",
          isSelected ? chartPalette["household"]! : chartPalette["public"]!
        );
        path.setAttribute("stroke-width", strokeWidth.toString());

        const text = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        text.setAttribute("x", (x[i] - TEXT_SIZE / 2).toString());
        text.setAttribute("y", (MAX_Y + TEXT_MARGIN).toString());
        text.innerHTML = (i + 1).toString();

        refSVG.current.appendChild(path);
        refSVG.current.appendChild(text);
      }
    }
  }, [datas, selectedIdx]);

  return (
    <SVG
      className="bar"
      ref={refSVG}
      viewBox={`0 0 ${VIEW_X} ${VIEW_Y}`}
      xmlns="https://www.w3.org/2000/svg"
    />
  );
}

const SVG = styled.svg`
  text {
    fill: ${white[900]};

    ${fontStyles["tag1"]};
  }
`;

import { blue, chartPalette, white } from "@styles/colors";
import _ from "lodash";
import React from "react";
import { BasicPieProps, SelectedPieProps } from "./types";
import { describeArc } from "./utils";

const RADIUS = 50;
const [CENTER_X, CENTER_Y] = _.fill(new Array(2), RADIUS);

function getPath(
  d: string,
  isSelected?: boolean,
  color?: string
): SVGPathElement {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  path.setAttribute("d", d);
  path.setAttribute("fill", isSelected ? chartPalette["household"]! : color!);
  path.setAttribute("stroke", blue[500]!);
  path.setAttribute("stroke-width", "2");

  return path;
}

export function BasicPie({ datas }: BasicPieProps) {
  const refSVG = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    if (refSVG.current) {
      while (refSVG.current?.hasChildNodes())
        refSVG.current.removeChild(refSVG.current.firstChild!);

      const total = _.sum(datas);
      const angles: Array<number> = [0];
      const colors = [
        chartPalette["household"],
        chartPalette["trading"],
        chartPalette["public"],
      ];
      for (let i = 0; i < datas.length; i++) {
        const angle = 360 * (datas[i] / total);
        const endAngle = angles[i] + angle;

        angles.push(endAngle);
        refSVG.current.appendChild(
          getPath(
            describeArc(CENTER_X, CENTER_Y, RADIUS, angles[i], endAngle),
            false,
            colors[i]
          )
        );
      }
    }
  }, [datas]);

  return (
    <svg
      ref={refSVG}
      className="pie"
      xmlns="https://www.w3.org/2000/svg"
      viewBox={`0 0 ${RADIUS * 2} ${RADIUS * 2}`}
    />
  );
}

export function SelectedPie({ datas, selectedIdx }: SelectedPieProps) {
  const refSVG = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    if (refSVG.current) {
      while (refSVG.current?.hasChildNodes())
        refSVG.current.removeChild(refSVG.current.firstChild!);

      const total = _.sum(datas);
      const angles: Array<number> = [0];
      for (let i = 0; i < datas.length; i++) {
        const angle = 360 * (datas[i] / total);
        const endAngle = angles[i] + angle;

        angles.push(endAngle);
        refSVG.current.appendChild(
          getPath(
            describeArc(CENTER_X, CENTER_Y, RADIUS, angles[i], endAngle),
            i === selectedIdx,
            white[100]
          )
        );
      }
    }
  }, [datas, selectedIdx]);

  return (
    <svg
      className="pie"
      ref={refSVG}
      xmlns="https://www.w3.org/2000/svg"
      viewBox={`0 0 ${RADIUS * 2} ${RADIUS * 2}`}
    />
  );
}

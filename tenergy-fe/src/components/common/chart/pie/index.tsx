import { blue, chartPalette, white } from "@styles/colors";
import _ from "lodash";
import React from "react";
import { describeArc } from "./utils";

const RADIUS = 50;
const [CENTER_X, CENTER_Y] = _.fill(new Array(2), RADIUS);

function getPath(d: string, isSelected: boolean): SVGPathElement {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  path.setAttribute("d", d);
  path.setAttribute(
    "fill",
    isSelected ? chartPalette["household"]! : white[100]!
  );
  path.setAttribute("stroke", blue[500]!);
  path.setAttribute("stroke-width", "2");

  return path;
}

export function SelectedPie() {
  const refSVG = React.useRef<SVGSVGElement>(null);
  const datas = [1, 2, 3, 4, 5];
  const selectedIdx = 3;

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
            i === selectedIdx
          )
        );
      }
    }
  }, [datas, selectedIdx]);

  return (
    <svg
      ref={refSVG}
      xmlns="https://www.w3.org/2000/svg"
      viewBox={`0 0 ${RADIUS * 2} ${RADIUS * 2}`}
    />
  );
}

import React from "react";
import _ from "lodash";
import { blue } from "@styles/colors";
import { LineStyleProps, SVGInformation } from "./types";
import styled from "styled-components";

function getPath(d: Array<string | number>): SVGPathElement {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  path.setAttribute("d", d.join(" "));
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", blue[900]!);
  path.setAttribute("stroke-width", "3");
  path.setAttribute("stroke-linejoin", "round");

  return path;
}

export function Line({ datas }: LineStyleProps) {
  const [svgInfo, setSvgInfo] = React.useState<SVGInformation | null>(null);
  const refWrap = React.useRef<HTMLDivElement>(null);
  const refSVG = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    const width = refWrap.current!.clientWidth;
    const height = refWrap.current!.clientHeight;
    // console.log(width, height);
    setSvgInfo({
      viewX: width,
      viewY: height,
    });
    refSVG.current?.setAttribute("width", width.toString());
    refSVG.current?.setAttribute("height", height.toString());
    refSVG.current!.setAttribute("viewBox", [0, 0, width, height].join(" "));
  }, []);

  React.useEffect(() => {
    while (refSVG.current?.hasChildNodes()) {
      refSVG.current.removeChild(refSVG.current.firstChild!);
    }
    if (svgInfo) {
      const dataLength = datas.length;
      const increaseX = svgInfo.viewX / dataLength;

      const min = _.min(datas)!;
      const max = _.max(datas)!;

      const d: Array<string | number> = [];
      d.push("M");
      d.push(0, svgInfo.viewY);
      datas.forEach((data, idx) => {
        const xEnd = increaseX * (idx + 1);
        const norm = (data - min) / (max - min);
        const yEnd = svgInfo.viewY * (1 - norm);

        d.push("L", xEnd, yEnd);
      });

      refSVG.current?.appendChild(getPath(d));
    }
  }, [svgInfo, datas]);

  return (
    <Wrap ref={refWrap} className="line">
      <svg
        width={0}
        height={0}
        ref={refSVG}
        xmlns="https://www.w3.org/2000/svg"
        style={{
          overflow: "visible",
        }}
      />
    </Wrap>
  );
}

const Wrap = styled.div``;

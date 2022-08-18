import { SelectedPie } from "@component/common/chart";
import styled from "styled-components";
import PublicPrice from "./PublicPrice";

export function PublicComponent() {
  return (
    <Wrap>
      <PublicPrice />
      <SelectedPie />
    </Wrap>
  );
}

const Wrap = styled.div``;

import { blue } from "@styles/colors";
import styled from "styled-components";

export const CardColGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  row-gap: 12px;
`;

export const CardRowGroup = styled.div`
  display: flex;
  flex-direction: row;

  column-gap: 16px;
`;

export const Card = styled.div`
  padding: 8px 10px;
  flex: 1;

  display: flex;
  flex-direction: column;

  background-color: ${blue[500]};

  cursor: pointer;
  border-radius: 8px;
`;

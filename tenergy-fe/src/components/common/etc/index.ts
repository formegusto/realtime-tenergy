import { blue } from "@styles/colors";
import styled from "styled-components";

export * from "./ScrollToTop";
export const UsageProfile = styled.div`
  width: 48px;
  height: 48px;

  border-radius: 24px;

  background-color: ${blue[700]};
  color: ${blue[300]};

  font-weight: 700;
  font-size: 12px;
  line-height: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

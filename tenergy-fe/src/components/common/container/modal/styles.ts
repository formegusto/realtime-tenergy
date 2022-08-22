import { other } from "@styles/colors";
import styled from "styled-components";

export const Header = styled.div`
  display: flex;

  width: 100%;
  height: 36px;

  & > div {
    flex: 1;
    display: flex;
    flex-direction: row;
  }

  .close-btn {
    background: none;

    border: none;

    padding: 0;
    cursor: pointer;
  }
`;

export const RightItem = styled.div`
  justify-content: flex-end;
`;
export const LeftItem = styled.div`
  justify-content: flex-start;
`;

export const FullScreen = styled.div`
  padding: 12px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 250;

  width: calc(100vw - 24px);
  height: calc(100vh - 24px);

  background-color: ${other["green"]};
`;

export const Wrap = styled.div`
  position: relative;

  width: 100%;
  height: calc(100% - 36px);

  max-width: 500px;
  margin: 0 auto;
  overflow-y: scroll;

  & > .confirm-btn {
    position: absolute;
    bottom: 12px;
  }
`;

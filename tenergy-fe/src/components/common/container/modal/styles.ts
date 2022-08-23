import { other, white } from "@styles/colors";
import styled, { keyframes } from "styled-components";

export const UpAnimation = keyframes`
  from {
    transform: translateY(100%);
  } to {
    transform: translateY(0);
  }
`;

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

export const DynamicBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.6);
`;

export const DynamicBlock = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;

  width: calc(100vw - 24px);
  padding: 12px;
  border-radius: 16px 16px 0 0;

  background-color: ${other["green"]};
  animation: ${UpAnimation} 0.15s linear forwards;
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
  animation: ${UpAnimation} 0.15s linear forwards;
`;

export const Wrap = styled.div`
  position: relative;

  width: 100%;
  height: calc(100% - 36px);

  max-width: 500px;
  margin: 0 auto;
  overflow-y: scroll;
  color: ${white[900]};

  & > .confirm-btn {
    position: absolute;
    bottom: 12px;
  }

  & > .title {
    margin: 8px 0;
  }
`;

export const QuantitySettingWrap = styled.div`
  padding: 32px 0 12px;

  display: flex;
  flex-direction: column;
  align-items: center;
  * {
    letter-spacing: 0.1em;
  }

  & > .title {
    color: ${white[100]};
    margin: 8px 0 0;
  }

  #quantity-setting {
    margin: 10px 0 32px;
  }
`;

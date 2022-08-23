import { ButtonGroup, CircleButton } from "@component/common/button";
import { DynamicBg, OpacityAnimation } from "@component/common/container";
import { ModalProps } from "@component/common/container/modal/types";
import { blue } from "@styles/colors";
import { H5 } from "@styles/typo";
import styled from "styled-components";

export function TradeConfirmModal({ closeAction }: ModalProps) {
  return (
    <>
      <DynamicBg onClick={closeAction} />
      <Wrap>
        <H5>거래를 취소하시겠습니까?</H5>
        <ButtonGroup nonFlex>
          <CircleButton>확인</CircleButton>
          <CircleButton colorTheme="lightblue" onClick={closeAction}>
            닫기
          </CircleButton>
        </ButtonGroup>
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  position: fixed;
  z-index: 255;

  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  width: 260px;
  height: 200px;

  background-color: ${blue[100]};

  margin: auto;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  color: white;

  animation: ${OpacityAnimation} 0.15s linear forwards;

  & > h5 {
    padding: 28px 0;
  }
`;

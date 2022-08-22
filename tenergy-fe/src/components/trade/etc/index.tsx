import { ButtonGroup, CircleButton } from "@component/common/button";
import { DynamicScreen } from "@component/common/container";
import { blue } from "@styles/colors";
import { H5 } from "@styles/typo";
import styled from "styled-components";

export function TradeConfirmModal() {
  return (
    <DynamicScreen>
      <Wrap>
        <H5>거래를 취소하시겠습니까?</H5>
        <ButtonGroup nonFlex>
          <CircleButton>확인</CircleButton>
          <CircleButton colorTheme="lightblue">닫기</CircleButton>
        </ButtonGroup>
      </Wrap>
    </DynamicScreen>
  );
}

const Wrap = styled.div`
  position: absolute;

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

  & > h5 {
    padding: 28px 0;
  }
`;

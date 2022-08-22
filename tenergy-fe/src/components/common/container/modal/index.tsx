import {
  FullScreen,
  Wrap,
  Header,
  LeftItem,
  RightItem,
  DynamicScreen,
  DynamicBlock,
  QuantitySettingWrap,
} from "./styles";
import { MdOutlineClear } from "react-icons/md";
import { white } from "@styles/colors";
import { Tag1 } from "@styles/typo";
import QuantitySetting from "./QuantitySetting";
import { Button } from "@component/common/button";

export function ModalHeader() {
  return (
    <Header>
      <LeftItem className="modal-left"></LeftItem>
      <RightItem className="modal-right">
        <button className="close-btn">
          <MdOutlineClear size={36} color={white[900]} />
        </button>
      </RightItem>
    </Header>
  );
}

export function FullScreenModal({ children }: React.PropsWithChildren<any>) {
  return (
    <FullScreen>
      <ModalHeader></ModalHeader>
      <Wrap>{children}</Wrap>
    </FullScreen>
  );
}

export function QuantitySettingModal({
  children,
}: React.PropsWithChildren<any>) {
  return (
    <DynamicScreen>
      <DynamicBlock>
        <ModalHeader />
        <QuantitySettingWrap>
          <Tag1 className="title">Config Trading Usage</Tag1>
          <QuantitySetting />
          <Button colorTheme="darkgreen" isBlock>
            Update
          </Button>
        </QuantitySettingWrap>
      </DynamicBlock>
    </DynamicScreen>
  );
}

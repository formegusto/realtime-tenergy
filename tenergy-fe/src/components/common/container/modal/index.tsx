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
import { ModalProps } from "./types";

export * from "./styles";

export function ModalHeader({ closeAction }: ModalProps) {
  return (
    <Header>
      <LeftItem className="modal-left"></LeftItem>
      <RightItem className="modal-right">
        <button className="close-btn" onClick={closeAction}>
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

export function QuantitySettingModal({ closeAction }: ModalProps) {
  return (
    <DynamicScreen>
      <DynamicBlock>
        <ModalHeader closeAction={closeAction} />
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

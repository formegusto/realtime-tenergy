import {
  FullScreen,
  Wrap,
  Header,
  LeftItem,
  RightItem,
  DynamicBlock,
  QuantitySettingWrap,
  DynamicBg,
} from "./styles";
import { MdOutlineClear } from "react-icons/md";
import { white } from "@styles/colors";
import { Tag1 } from "@styles/typo";
import QuantitySetting from "./QuantitySetting";
import { Button } from "@component/common/button";
import { ModalProps, QuantitySettingModalProps } from "./types";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { patchAuth } from "@api";
import { useSetRecoilState } from "recoil";
import { householdState } from "@store/atom";

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

export function FullScreenModal({
  children,
  closeAction,
}: React.PropsWithChildren<ModalProps>) {
  return (
    <FullScreen>
      <ModalHeader closeAction={closeAction}></ModalHeader>
      <Wrap>{children}</Wrap>
    </FullScreen>
  );
}

export function QuantitySettingModal({
  closeAction,
  id,
  initQuantity,
}: ModalProps & QuantitySettingModalProps) {
  const setHousehold = useSetRecoilState(householdState);
  const [quantity, setQuantity] = React.useState<number>(initQuantity);
  const patchAuthMutation = useMutation(["patchAuthQuery"], patchAuth, {
    onSuccess: ({ household }) => {
      setHousehold(household);
      closeAction!();
    },
  });

  const updateQuantity = React.useCallback(() => {
    patchAuthMutation.mutate({ id, quantity });
  }, [patchAuthMutation, quantity, id]);

  return (
    <>
      <DynamicBg onClick={closeAction} />
      <DynamicBlock>
        <ModalHeader closeAction={closeAction} />
        <QuantitySettingWrap>
          <Tag1 className="title">Config Trading Usage</Tag1>
          <QuantitySetting quantity={quantity} setQuantity={setQuantity} />
          <Button onClick={updateQuantity} colorTheme="darkgreen" isBlock>
            Update
          </Button>
        </QuantitySettingWrap>
      </DynamicBlock>
    </>
  );
}

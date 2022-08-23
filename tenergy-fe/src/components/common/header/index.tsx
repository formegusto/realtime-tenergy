import styled from "styled-components";
import { MdMiscellaneousServices } from "react-icons/md";
import { blue, white } from "@styles/colors";
import SimpleProfile from "./SimpleProfile";
import { useRecoilState, useRecoilValue } from "recoil";
import { householdState, tokenState } from "@store/atom";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { check } from "@api";
import { useModal } from "@hooks";
import { IconButton } from "../button";
import { QuantitySettingModal } from "../container";

export * from "./NavigateHeader";

export function Header() {
  const [QuantityModal, isOpen, open, close] = useModal({
    modal: QuantitySettingModal,
  });
  const token = useRecoilValue(tokenState);
  const [household, setHousehold] = useRecoilState(householdState);
  const checkMutation = useMutation(["checkAuthQuery"], check, {
    onSuccess: ({ household }) => {
      setHousehold(household);
    },
  });

  React.useEffect(() => {
    if (token) checkMutation.mutate(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <Wrap>
      <IconButton>
        <MdMiscellaneousServices size={24} onClick={isOpen ? close : open} />
      </IconButton>
      {household && <SimpleProfile data={household} />}
      <QuantityModal closeAction={close} />
    </Wrap>
  );
}

const Wrap = styled.header`
  position: fixed;
  z-index: 2;

  left: 0;
  top: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: calc(100% - 24px);
  height: 60px;

  padding: 0 12px;

  color: ${white[900]};
  background-color: ${blue[100]};
`;

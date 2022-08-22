import { FullScreen, Wrap, Header, LeftItem, RightItem } from "./styles";
import { MdOutlineClear } from "react-icons/md";
import { white } from "@styles/colors";

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

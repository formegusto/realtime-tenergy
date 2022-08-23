import { getMy } from "@api";
import { MyComponent, TradeInformation, TradeRequestList } from "@component";
import { useModal } from "@hooks";
import { useQuery } from "@tanstack/react-query";

export function MyContainer() {
  const [RequestListModal, , listOpen, listClose] = useModal({
    modal: TradeRequestList,
  });
  const [InformationModal, , infoOpen, infoClose] = useModal({
    modal: TradeInformation,
  });
  const { data } = useQuery(["getMyQuery"], getMy, {
    refetchOnWindowFocus: false,
  });
  return data ? (
    <>
      <MyComponent data={data} listOpen={listOpen} infoOpen={infoOpen} />
      <RequestListModal closeAction={listClose} />
      <InformationModal closeAction={infoClose} />
    </>
  ) : (
    <></>
  );
}

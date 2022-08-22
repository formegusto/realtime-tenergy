import { Button } from "@component/common/button";
import { FullScreenModal } from "@component/common/container";
import RequestTable from "./RequestTable";
import RequestUsage from "./RequestUsage";

export function TradeRequest() {
  return (
    <FullScreenModal>
      <RequestUsage>30</RequestUsage>
      <RequestTable />
      <Button className="confirm-btn" colorTheme="darkgreen" isBlock>
        거래요청
      </Button>
    </FullScreenModal>
  );
}

export function TradeRequestList() {
  return <></>;
}

import { Line } from "@component/common/chart";
import { TopContainer } from "@component/common/container";
import NuginStep from "./NuginStep";

function UsageHistory() {
  return (
    <TopContainer className="usage-history" isRadius isShadow>
      <NuginStep />
      <Line datas={[1, 2, 3, 4, 5, 6]} />
    </TopContainer>
  );
}

export default UsageHistory;

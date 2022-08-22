import { Meter } from "@api/types";
import { Line } from "@component/common/chart";
import { TopContainer } from "@component/common/container";
import NuginStep from "./NuginStep";

type Props = {
  meter: Meter;
  history: number[];
};

function UsageHistory({ meter, history }: Props) {
  return (
    <TopContainer className="usage-history" isRadius isShadow>
      <NuginStep selectedStep={meter.step} />
      <Line datas={history} />
    </TopContainer>
  );
}

export default UsageHistory;

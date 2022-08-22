import { ResGetPublicById } from "@api/types";
import styled from "styled-components";
import GroupStatus from "./GroupStatus";
import PrivatePrice from "./PrivatePrice";
import PublicPrice from "./PublicPrice";
import SelectedGroup from "./SelectedGroup";
import _ from "lodash";

type Props = {
  data: ResGetPublicById;
};

export function PublicComponent({ data }: Props) {
  return (
    <Wrap>
      <PublicPrice {...data} />
      <SubContent>
        <SelectedGroup
          data={data.distribution}
          table={data.distributionTable}
        />
        <PrivatePrice
          privatePublicPrice={data.privatePublicPrice}
          {...data.distribution}
        />
        <GroupStatus
          histInfo={data.histInfo}
          selectedIdx={_.findIndex(
            data.distributionTable,
            ({ groupNo }) => groupNo === data.distribution.groupNo
          )}
        />
      </SubContent>
    </Wrap>
  );
}

const Wrap = styled.div``;

const SubContent = styled.div`
  padding: 0 12px;
`;

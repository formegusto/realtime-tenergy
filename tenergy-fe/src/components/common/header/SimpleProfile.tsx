import { blue } from "@styles/colors";
import { Tag1 } from "@styles/typo";
import styled from "styled-components";
import { MdRoofing } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Household } from "@api/types";
// import _ from "lodash";

type Props = {
  data: Household;
};

function SimpleProfile({ data }: Props) {
  const navigate = useNavigate();

  return (
    <Wrap>
      <MdRoofing size={16} />
      <Tag1 onClick={() => navigate("/my", { replace: true })}>
        {data.name}
        {/* {_.drop(data.name.split("-")).join("-")} */}
      </Tag1>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  padding: 6px 12px;
  column-gap: 6px;

  border-radius: 100px;
  background-color: ${blue[500]};

  cursor: pointer;
`;

export default SimpleProfile;

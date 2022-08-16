import { blue } from "@styles/colors";
import { Tag1 } from "@styles/typo";
import styled from "styled-components";
import { MdRoofing } from "react-icons/md";

function SimpleProfile() {
  return (
    <Wrap>
      <MdRoofing size={16} />
      <Tag1>101동-1000호</Tag1>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  padding: 6px 12px;
  column-gap: 6px;

  border-radius: 100px;
  background-color: ${blue[500]};
`;

export default SimpleProfile;

import styled from "styled-components";
import { NavigateHeaderProps } from "./types";
import { MdOutlineArrowBack } from "react-icons/md";
import { white } from "@styles/colors";
import { useNavigate } from "react-router-dom";
import { fontStyles } from "@styles/typo/styles";

export function NavigateHeader(props: NavigateHeaderProps) {
  const navigate = useNavigate();

  return (
    <Wrap>
      <MdOutlineArrowBack
        size={24}
        className="back-button"
        onClick={() => navigate(-1)}
      />
      <span className="title">{props.title}</span>
    </Wrap>
  );
}

const Wrap = styled.header`
  position: fixed;

  left: 0;
  top: 0;

  height: 60px;
  width: calc(100%);

  color: ${white[900]};

  & > .back-button {
    position: absolute;

    top: 0;
    bottom: 0;
    left: 12px;

    margin: auto 0;

    cursor: pointer;
  }

  & > .title {
    ${fontStyles["h5"]}
    position: absolute;

    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    margin: auto;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

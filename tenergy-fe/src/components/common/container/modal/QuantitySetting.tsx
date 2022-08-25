import styled from "styled-components";
import { MdOutlineHorizontalRule, MdOutlineAdd } from "react-icons/md";
import { white } from "@styles/colors";
import { fontStyles } from "@styles/typo/styles";
import React from "react";
import { QuantitySettingModalProps } from "./types";

function QuantitySetting({ id, initQuantity }: QuantitySettingModalProps) {
  const [quantity, setQuantity] = React.useState<number>(initQuantity);
  return (
    <Wrap id="quantity-setting">
      <button onClick={() => setQuantity(quantity - 1)}>
        <MdOutlineHorizontalRule size={28} color={white[900]} />
      </button>
      <input type="text" readOnly value={quantity} />
      <button onClick={() => setQuantity(quantity + 1)}>
        <MdOutlineAdd size={28} color={white[900]} />
      </button>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 12px;
  padding: 8px 0;

  input[type="text"] {
    ${fontStyles["h1"]}
    background: none;
    border: none;

    color: ${white[900]};
    border-bottom: 2px solid ${white[900]};
    padding: 6px 12px 8px;

    width: 55px;
    box-sizing: border-box;
    text-align: center;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;

    padding: 0;
  }
`;

export default QuantitySetting;

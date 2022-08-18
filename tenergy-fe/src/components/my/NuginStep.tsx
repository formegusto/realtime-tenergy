import { chartPalette, other, white } from "@styles/colors";
import { H4 } from "@styles/typo";
import { fontStyles } from "@styles/typo/styles";
import styled from "styled-components";

function NuginStep() {
  const selectedStep = 2;

  return (
    <Wrap>
      <H4>누진단계</H4>
      <StepList>
        {[1, 2, 3].map((step) => (
          <StepItem
            key={`nugin-step-${step}`}
            className={`step-${step} ${
              step === selectedStep ? "active" : "active"
            }`}
          >
            {step}
          </StepItem>
        ))}
      </StepList>
    </Wrap>
  );
}

const Wrap = styled.div`
  color: ${white[900]};

  display: flex;
  flex-direction: row;

  justify-content: flex-start;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

const StepList = styled.ul`
  display: flex;
  margin: 0 0px 0 10px;
  column-gap: 2px;
`;

const StepItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 20px;
  height: 20px;
  border-radius: 100%;

  ${fontStyles["tag2"]}
  background-color: #eee;

  &.active {
    &.step-1 {
      background-color: ${chartPalette["household"]};
    }
    &.step-2 {
      background-color: ${other["fluorescent"]};
    }

    &.step-3 {
      background-color: ${other["lightred"]};
    }
  }
`;

export default NuginStep;

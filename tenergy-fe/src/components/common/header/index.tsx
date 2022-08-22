import styled from "styled-components";
import { MdMiscellaneousServices } from "react-icons/md";
import { blue, white } from "@styles/colors";
import SimpleProfile from "./SimpleProfile";
import { useRecoilState, useRecoilValue } from "recoil";
import { householdState, tokenState } from "@store/atom";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { check } from "@api";

export * from "./NavigateHeader";

export function Header() {
  const token = useRecoilValue(tokenState);
  const [household, setHousehold] = useRecoilState(householdState);
  const checkMutation = useMutation(["checkAuthQuery"], check, {
    onSuccess: ({ household }) => {
      setHousehold(household);
    },
  });

  React.useEffect(() => {
    if (token) checkMutation.mutate(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <Wrap>
      <MdMiscellaneousServices size={24} />
      {household && <SimpleProfile data={household} />}
    </Wrap>
  );
}

const Wrap = styled.header`
  position: fixed;

  left: 0;
  top: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: calc(100% - 24px);
  height: 60px;

  padding: 0 12px;

  color: ${white[900]};
  background-color: ${blue[100]};
`;

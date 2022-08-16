import { nextControl, prevControl } from "@api";
import ControlComponent from "@components/ControlComponent";
import { tokenState } from "@store/atoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useRecoilState } from "recoil";

function ControlContainer() {
  const queryClient = useQueryClient();
  const [token, setTokenState] = useRecoilState(tokenState);
  const nextMutate = useMutation(nextControl, {
    onSuccess: ({ token }) => {
      setTokenState(token);
      queryClient.invalidateQueries(["getControls"]);
    },
  });
  const prevMutate = useMutation(prevControl, {
    onSuccess: ({ token }) => {
      setTokenState(token);
      queryClient.invalidateQueries(["getControls"]);
    },
  });

  const next = React.useCallback(() => {
    if (token) nextMutate.mutate(token);
  }, [nextMutate, token]);

  const prev = React.useCallback(() => {
    if (token) prevMutate.mutate(token);
  }, [prevMutate, token]);

  return token ? <ControlComponent next={next} prev={prev} /> : <></>;
}

export default ControlContainer;

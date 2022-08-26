import { nextControl, prevControl } from "@api";
import ControlComponent from "@components/ControlComponent";
import { tokenState } from "@store/atoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useRecoilState } from "recoil";

function ControlContainer() {
  const [autoNext, setAutoNext] = React.useState<boolean>(false);
  const [autoPrev, setAutoPrev] = React.useState<boolean>(false);
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

  React.useEffect(() => {
    let intervalId: NodeJS.Timer | null = null;
    if (autoNext) {
      intervalId = setInterval(next, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoNext, next]);

  React.useEffect(() => {
    let intervalId: NodeJS.Timer | null = null;
    if (autoPrev) {
      intervalId = setInterval(prev, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoPrev, prev]);

  return token ? (
    <ControlComponent
      next={next}
      prev={prev}
      autoNext={autoNext}
      setAutoNext={setAutoNext}
      autoPrev={autoPrev}
      setAutoPrev={setAutoPrev}
    />
  ) : (
    <></>
  );
}

export default ControlContainer;

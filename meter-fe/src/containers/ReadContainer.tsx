import { getControl, getControls } from "@api";
import { DefaultLoading } from "@components/common";
import ReadComponent from "@components/ReadComponent";
import { tokenState } from "@store/atoms";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { useSetRecoilState } from "recoil";

function ReadContainer() {
  const setTokenState = useSetRecoilState(tokenState);
  const { data, isLoading } = useQuery(["getControls"], getControls, {
    refetchOnWindowFocus: false,
    retry: false,
  });
  const controlMutate = useMutation(getControl, {
    onSuccess: ({ token }) => {
      setTokenState(token);
    },
  });

  const selectControl = React.useCallback(
    (_id: string) => {
      controlMutate.mutate(_id);
    },
    [controlMutate]
  );

  if (isLoading) return <DefaultLoading />;

  return (
    <ReadComponent controls={data?.controls} selectControl={selectControl} />
  );
}

export default ReadContainer;

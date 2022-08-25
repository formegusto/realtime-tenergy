import { check } from "@api";
import { householdState, tokenState } from "@store/atom";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

export function AuthCheck({ children }: React.PropsWithChildren<any>) {
  const setToken = useSetRecoilState(tokenState);
  const setHousehold = useSetRecoilState(householdState);
  const checkMutation = useMutation(["checkAuthQuery"], check, {
    onSuccess: ({ household }) => {
      setTimeout(() => {
        setHousehold(household);
      }, 1000);
    },
  });
  const household = useRecoilValue(householdState);
  const navigate = useNavigate();

  console.log(household);

  React.useEffect(() => {
    if (household === null) {
      const storageToken = localStorage.getItem("token");
      if (storageToken) {
        setToken(storageToken);
        checkMutation.mutate(storageToken);
      } else {
        alert("로그인이 필요한 페이지 입니다.");
        navigate("/", { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return household ? children : <></>;
}

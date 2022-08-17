import { LoginComponent } from "@component";
import { useMutation } from "@tanstack/react-query";
import { login } from "@api";
import React from "react";
import { useRecoilState } from "recoil";
import { tokenState } from "@store/atom";
import { ResLogin } from "api/types";
import { useNavigate } from "react-router-dom";

export function LoginContainer() {
  const navigate = useNavigate();

  const [name, setName] = React.useState("");
  const [token, setTokenState] = useRecoilState(tokenState);
  const loginMutate = useMutation<ResLogin, unknown, string>(login, {
    onSuccess: ({ token }) => {
      setTokenState(token);
      localStorage.setItem("token", token);
    },
  });

  React.useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  const onSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      loginMutate.mutate(name);
    },
    [name, loginMutate]
  );

  const changeName = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    []
  );

  return <LoginComponent onSubmit={onSubmit} changeName={changeName} />;
}

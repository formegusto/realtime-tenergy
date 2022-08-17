import AuthComponent from "@component/auth";
import React from "react";
import { useNavigate } from "react-router-dom";

export * from "./LoginContainer";
export function AuthContainer() {
  const navigate = useNavigate();

  const navigateLogin = React.useCallback(() => {
    navigate("/auth/login");
  }, [navigate]);

  return <AuthComponent navigateLogin={navigateLogin} />;
}

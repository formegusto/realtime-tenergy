import { AuthContainer } from "@container";
import { Route, Routes } from "react-router-dom";
import LoginScreen from "./LoginScreen";

function RootScreen() {
  return <AuthContainer />;
}

export function AuthScreen() {
  return (
    <Routes>
      <Route path="/" element={<RootScreen />} />
      <Route path="/login" element={<LoginScreen />} />
    </Routes>
  );
}

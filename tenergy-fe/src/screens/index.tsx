import { Footer, Header } from "@component/common";
import { Outlet } from "react-router-dom";

export * from "./buyer";
export * from "./main";
export * from "./my";
export * from "./seller";
export * from "./public";

export function RootScreen() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

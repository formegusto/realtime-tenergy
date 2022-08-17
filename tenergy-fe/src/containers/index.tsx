import { Footer, Header, Splash } from "@component/common";
import { tokenState } from "@store/atom";
import { Outlet, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";

export * from "./auth";

const SPLASHPAGES = ["/", "/auth"];

export function RootContainer() {
  const token = useRecoilValue(tokenState);
  const { pathname } = useLocation();

  return token ? (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  ) : SPLASHPAGES.includes(pathname) ? (
    <Splash logoAnimation={pathname === "/"} />
  ) : (
    <></>
  );
}

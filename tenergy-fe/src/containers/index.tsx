import { Wrapper } from "@component";
import { Footer, Header, Splash } from "@component/common";
import { tokenState } from "@store/atom";
import { Outlet, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";

export * from "./auth";
export * from "./main";

const SPLASHPAGES = ["/", "/auth"];

export function RootContainer() {
  const token = useRecoilValue(tokenState);
  const { pathname } = useLocation();

  return token ? (
    <>
      <Header />
      <Wrapper>
        <Outlet />
      </Wrapper>
      <Footer />
    </>
  ) : SPLASHPAGES.includes(pathname) ? (
    <>
      <Splash logoAnimation={pathname === "/"} />
      <Outlet />
    </>
  ) : (
    <Outlet />
  );
}

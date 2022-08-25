import { Wrapper } from "@component";
import { Footer, Header, Splash } from "@component/common";
import { householdState } from "@store/atom";
import { Outlet, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";

export * from "./auth";
export * from "./main";
export * from "./seller";
export * from "./buyer";
export * from "./public";
export * from "./my";

const SPLASHPAGES = ["/", "/auth"];

export function RootContainer() {
  const household = useRecoilValue(householdState);
  const { pathname } = useLocation();

  return household ? (
    <>
      <Header />
      <Wrapper>
        <Outlet />
      </Wrapper>
      <Footer />
    </>
  ) : SPLASHPAGES.includes(pathname) ? (
    <>
      <Splash logoAnimation={pathname === "/"} absolute />
      <Outlet />
    </>
  ) : (
    <Outlet />
  );
}

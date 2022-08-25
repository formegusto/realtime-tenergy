import { NavigateHeader } from "@component/common";
import { AuthContainer } from "@container";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import LoginScreen from "./LoginScreen";

function RootScreen() {
  return <AuthContainer />;
}

export function AuthScreen() {
  const location = useLocation();
  const [direction, setDirection] = React.useState<"right" | "left">("right");

  React.useEffect(() => {
    if (location.pathname === "/auth") {
      setDirection("right");
    } else {
      setDirection("left");
    }
  }, [location]);

  // const changeDirection = React.useCallback(() => {
  //   if (location.pathname === "/auth") {
  //     setDirection("right");
  //   } else {
  //     setDirection("left");
  //   }
  // }, [location]);

  return (
    <>
      {location.pathname !== "/auth" && <NavigateHeader title="Log In" />}
      <TransitionGroup className="transition-wrapper">
        <CSSTransition
          key={location.pathname}
          classNames={direction}
          timeout={300}
          // onExited={changeDirection}
        >
          <Routes location={location}>
            <Route path="/" element={<RootScreen />} />
            <Route path="/login" element={<LoginScreen />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

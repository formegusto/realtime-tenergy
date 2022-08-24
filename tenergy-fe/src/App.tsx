import {
  AuthScreen,
  BuyerScreen,
  MainScreen,
  MyScreen,
  PublicScreen,
  RootScreen,
  SellerScreen,
} from "@screen";
import React from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  const setSize = React.useCallback(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  React.useEffect(() => {
    setSize();
    window.addEventListener("resize", setSize);
  }, [setSize]);

  return (
    <Routes>
      <Route path="/" element={<RootScreen />}>
        <Route index element={<MainScreen />} />
        <Route path="/seller" element={<SellerScreen />} />
        <Route path="/buyer" element={<BuyerScreen />} />
        <Route path="/public" element={<PublicScreen />} />
        <Route path="/my" element={<MyScreen />} />
      </Route>
      <Route path="/auth/*" element={<AuthScreen />} />
    </Routes>
  );
}

export default App;

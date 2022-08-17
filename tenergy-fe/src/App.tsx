import {
  AuthScreen,
  BuyerScreen,
  MainScreen,
  MyScreen,
  PublicScreen,
  RootScreen,
  SellerScreen,
} from "@screen";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootScreen />}>
        <Route index element={<MainScreen />} />
        <Route path="/seller" element={<SellerScreen />} />
        <Route path="/buyer" element={<BuyerScreen />} />
        <Route path="/public" element={<PublicScreen />} />
        <Route path="/my" element={<MyScreen />} />
        <Route path="/auth/*" element={<AuthScreen />} />
      </Route>
    </Routes>
  );
}

export default App;

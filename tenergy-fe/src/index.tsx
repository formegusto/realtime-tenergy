import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { NavigateAnimation, ResetStyle } from "@styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router } from "react-router-dom";
import { ScrollToTop } from "@component/common/etc";
// import { Splash } from "@component/common";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <ResetStyle />
      <NavigateAnimation />
      <Router>
        <ScrollToTop />
        <App />
      </Router>
      {/* <Splash /> */}
    </RecoilRoot>
  </QueryClientProvider>
);
reportWebVitals();

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import GlobalStyles from "@styles/GlobalStyles";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <GlobalStyles />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </QueryClientProvider>
);

reportWebVitals();

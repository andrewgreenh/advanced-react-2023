import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { App } from "./App";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

// TypeScript examples of inference
let x: number | string = 5;

x = 10;

x = "test";

function Comp(props: { x: number }) {}

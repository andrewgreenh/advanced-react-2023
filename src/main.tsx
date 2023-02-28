import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);

// TypeScript examples of inference
let x: number | string = 5;

x = 10;

x = "test";

function Comp(props: { x: number }) {}

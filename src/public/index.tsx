import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import "./output.css";

const root = document.getElementById("root");
if (root) createRoot(root).render(<App />);

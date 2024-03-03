import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import "./main.css";

const root = document.getElementById("root");
if (root) createRoot(root).render(<App />);

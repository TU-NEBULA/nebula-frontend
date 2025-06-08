import "./index.css";

import { StagewiseToolbar } from "@stagewise/toolbar-react";

import { createRoot } from "react-dom/client";

import App from "./App.tsx";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

if (import.meta.env.DEV) {
  const toolbarRoot = createRoot(document.createElement("div"));
  toolbarRoot.render(<StagewiseToolbar config={{ plugins: [] }} />);
}

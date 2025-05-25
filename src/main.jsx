import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CategoryProvider } from "./context/CategoryContext";
import { SoundProvider } from "./context/SoundContext";
import "./index.css";

import { DndProvider } from "react-dnd";
import { MultiBackend } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <CategoryProvider>
          <SoundProvider>
            <App />
          </SoundProvider>
        </CategoryProvider>
      </DndProvider>
    </BrowserRouter>
  </React.StrictMode>
);

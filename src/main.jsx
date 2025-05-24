import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CategoryProvider } from "./context/CategoryContext";
import "./index.css"

import { SoundProvider } from './context/SoundContext';



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CategoryProvider>
        <SoundProvider>
          <App />
        </SoundProvider>
      </CategoryProvider>
    </BrowserRouter>
  </React.StrictMode>
);

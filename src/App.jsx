import React from "react";
import { Routes, Route } from "react-router-dom";
import Game from "./Game";
import CategorySelection from "./components/CategorySelection";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CategorySelection />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

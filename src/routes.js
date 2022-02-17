import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Setup from "./screens/setup";
import HangmanGame from "./screens/hangmanGame";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Setup />} />
        <Route path="/game" element={<HangmanGame />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

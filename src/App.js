
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "../src/App.css";
import PlayConnect4 from "./components/pages/PlayConnect4";
import PageWrapper from "./components/reusables/PageWrapper";





const App = () => {

return (
  <PageWrapper>
      <Routes>
        <Route path="/" element={<PlayConnect4/>} />
      </Routes>
  </PageWrapper>
)
}
export default App
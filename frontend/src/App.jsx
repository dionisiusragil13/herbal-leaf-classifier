import { useState } from "react";
import { Route, Routes, Navigate } from "react-router";
import HomePage from "../src/pages/HomePage";
import Navbar from "./components/Navbar";
import TrainPage from "../src/pages/TrainPage";
import TestPage from "../src/pages/TestPage";


function App() {
  return (
    <div className="bg-green-950 min-h-screen pt-4">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/train" element={<TrainPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </div> 
  );
}

export default App;

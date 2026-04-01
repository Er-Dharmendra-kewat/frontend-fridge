import './App.css'
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ScanProduct from "./components/ScanProduct";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/scan" element={<ScanProduct />} />
      </Routes>
    </div>
  );
}

export default App;
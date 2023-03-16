import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Navbar from "../components/Navbar";

export default (
  <Router>
    <Routes>
      <Navbar />
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
);

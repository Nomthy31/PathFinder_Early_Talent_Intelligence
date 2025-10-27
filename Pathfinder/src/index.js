import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/login";
import Home from "./pages/home";
import './index.css';


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />    {/* Step 1: Login */}
        <Route path="/home" element={<Home />} /> {/* Step 2: Landing Page */}
        <Route path="/app" element={<App />} />   {/* Step 3: Subject + Activities */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

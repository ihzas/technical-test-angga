import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import {AddTransaksi} from "./pages/AddTransaksi.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path="/add" element={<AddTransaksi />} />
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

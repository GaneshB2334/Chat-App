
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Toaster 
        position="top-center" 
        toastOptions={{
          duration: 3000,
          style: {
            background: '#253237',
            color: '#E0FBFC',
            border: '1px solid rgba(157, 180, 192, 0.2)',
          },
          success: {
            iconTheme: {
              primary: '#C2DFE3',
              secondary: '#253237',
            },
          },
          error: {
            iconTheme: {
              primary: '#d88c8c',
              secondary: '#253237',
            },
          },
        }}
      />
    </div>
  );
};

export default App;

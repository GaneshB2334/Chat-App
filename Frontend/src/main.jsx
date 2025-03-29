import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
  </HashRouter>
)

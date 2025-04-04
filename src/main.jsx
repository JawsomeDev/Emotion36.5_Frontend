import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import React from "react"
import { AuthProvider } from "./components/context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
    <App />
    </AuthProvider>
)

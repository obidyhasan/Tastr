import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { ToastContainer } from "react-toastify";
import AuthProvider from "./providers/AuthProvider.jsx";
import Router from "./routes/Router.jsx";
import { ThemeProvider } from "./providers/ThemeProvider.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer></ToastContainer>
    <AuthProvider>
      <ThemeProvider>
        <Router></Router>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);

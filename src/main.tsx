import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import LoadingPage from "./pages/LoadingPage.tsx";
import Students from "./pages/students/Students.tsx";
import { ProtectRoutes } from "./utils/ProtectRoutes.tsx";
import { UserProvider } from "./hooks/authentication.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App></App>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);

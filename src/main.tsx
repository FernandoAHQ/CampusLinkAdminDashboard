import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import LoadingPage from "./pages/LoadingPage.tsx";
import Students from "./pages/students/Students.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<LoadingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="students" element={<Students />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./routes/ProtectedRoute";

import { Toaster } from "./components/ui/sonner";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          {/* PUBLIC HOME */}
          <Route path="/" element={<HomePage />} />

          {/* ADMIN LOGIN */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* PROTECTED ADMIN PANEL */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>

      {/* GLOBAL TOASTS */}
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;

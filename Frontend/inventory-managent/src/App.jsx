import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Register />} path="/register" />
          <Route element={<Login />} path="/login" />
          <Route element={<ProtectedRoutes />}>
            <Route element={<Dashboard />} path="/dashboard" />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;


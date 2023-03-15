import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../HomePage/Home";
import Login from "../LoginPage/Login";
import Register from "../RegisterPage/Register";
import Main from "../MainPage/Main";
import { getToken } from "../_utils";

function AppRoutes({ isLoggedIn, setIsLoggedIn }) {
  if (getToken()) {
    isLoggedIn = true;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/main"
        element={isLoggedIn ? <Main /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route
        path="/register"
        element={<Register setIsLoggedIn={setIsLoggedIn} />}
      />
    </Routes>
  );
}

export default AppRoutes;

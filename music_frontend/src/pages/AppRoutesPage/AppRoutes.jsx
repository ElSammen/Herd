import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../HomePage/Home";
import AuthPage from "../AuthComponents/AuthPage";
import { getToken } from "../_utils";

function AppRoutes({ isLoggedIn, setIsLoggedIn }) {
  if (getToken()) {
    setIsLoggedIn(true)
  }

  useEffect(() => {
    console.log(isLoggedIn)
  })

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<AuthPage setIsLoggedIn={(value) => setIsLoggedIn(value)} />} />
      <Route path="/home" element={<Home/>}/>
    </Routes>
  );
}

export default AppRoutes;

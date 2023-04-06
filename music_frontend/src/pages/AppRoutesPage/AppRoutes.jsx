import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../HomePage/Home";
import AuthPage from "../AuthComponents/AuthPage";
import Profile from '../ProfilePage/ProfilePage';
import { getToken } from "../_utils";

function AppRoutes({ isLoggedIn, setIsLoggedIn, profile }) {
  if (getToken()) {
    setIsLoggedIn(true)
  }
  useEffect(() => {
    console.log(isLoggedIn)
  })
  const token = getToken();
  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<AuthPage setIsLoggedIn={(value) => setIsLoggedIn(value)} />} />
      <Route path="/home" element={token ? <Home profile={profile}/> : <Navigate to="/login"/>}/>
    </Routes>
  );
}
export default AppRoutes;

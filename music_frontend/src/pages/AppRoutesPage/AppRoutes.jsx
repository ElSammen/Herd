import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../HomePage/Home";
import AuthPage from "../AuthComponents/AuthPage";
import DrumMachine from "../DrumMachinePage/DrumMachine"
import Profile from '../ProfilePage/ProfilePage';
import { getToken } from "../_utils";

function AppRoutes({ isLoggedIn, setIsLoggedIn }) {
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
      <Route path="/home" element={token ? <Home/> : <Navigate to="/login"/>}/>
      <Route path="/drum" element={token ? <DrumMachine/> : <Navigate to="/login"/>}/>
      <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />}/>
    </Routes>
  );
}
export default AppRoutes;

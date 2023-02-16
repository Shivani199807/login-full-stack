import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Register from "../pages/Register";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import { useNavigate } from "react-router-dom";
const routes = () => {
  //   const navigate = useNavigate();
  //   useEffect(() => {
  //     if (!localStorage.getItem("token") || window.location.hostname == "/") {
  //       navigate("/register");
  //     } else {
  //       navigate("/dashboard");
  //     }
  //   }, []);
  return (
    <Routes>
      <Route path="/login" exact element={<Login />}></Route>
      <Route path="/register" exact element={<Register />}></Route>
      <Route path="/dashboard" exact element={<Dashboard />}></Route>
    </Routes>
  );
};

export default routes;

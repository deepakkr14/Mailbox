import { Outlet, Navigate } from "react-router-dom";
import Nav from "../components/UI/Nav";
import React from "react";

const ProtectedRoutes = () => {
  return localStorage.getItem("token") ? (
    <>
      <Nav />
      <Outlet />
    </>
  ) : (
    <Navigate to="/singin" />
  );
};

export default ProtectedRoutes;

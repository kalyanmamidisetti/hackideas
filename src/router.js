import React from "react";
import { Navigate, Outlet } from "react-router-dom";
//LOCAL IMPORTS
import { getLoggedInStatus } from "./Helpers/basic";

export const PrivateRoute = () => {
  return getLoggedInStatus() ? <Outlet /> : <Navigate to="/" />;
};

import React from "react";
import { Routes, Route } from "react-router-dom";
//LOCAL IMPORTS
import Login from "../Components/Login";
import LandingPage from "../Components/App";
import { PrivateRoute } from "../router";

function Layout(props) {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<PrivateRoute />}>
          <Route path="/app" element={<LandingPage />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default Layout;

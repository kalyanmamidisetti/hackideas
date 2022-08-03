import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
//LOCAL IMPORTS
import Login from "../Components/Login";
import LandingPage from "../Components/App";
import { PrivateRoute } from "../router";

const cahce = createCache({
  key: "css",
  prepend: true,
});

function Layout(props) {
  const navigate = useNavigate();
  useEffect(() => {
    const empToken = localStorage.getItem("emp_token");
    if (empToken) {
      navigate("/app");
    }
  }, [navigate]);

  return (
    <CacheProvider value={cahce}>
      <StyledEngineProvider injectFirst>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/app" element={<PrivateRoute />}>
            <Route path="/app" element={<LandingPage />} />
          </Route>
        </Routes>
      </StyledEngineProvider>
    </CacheProvider>
  );
}

export default Layout;

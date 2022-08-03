import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
//LOCAL IMPORTS
import MainLayout from "./Layout";

function App() {
  return (
    <Router>
      <div className="App">
        <MainLayout />
      </div>
    </Router>
  );
}

export default App;

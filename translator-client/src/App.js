import "./css/App.css";
import React, { useState } from "react";
import Login from "./components/Login/Login";
import DashBoard from "./components/DashBoard/DashBoard";

function App() {
  const [token, setToken] = useState("");

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return <DashBoard token={token} />;
}

export default App;
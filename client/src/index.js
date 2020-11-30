import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App";
import { InventoryProvider } from "./components/InventoryContext";
import { AuthProvider } from "./components/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <InventoryProvider>
        <App />
      </InventoryProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import ReducerBankApp from "./ReducerBankApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <ReducerBankApp /> */}
  </React.StrictMode>
);

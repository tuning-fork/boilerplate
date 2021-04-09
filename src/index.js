import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import { CurrentUserProvider } from "./Contexts/currentUserContext";
import { CurrentOrganizationProvider } from "./Contexts/currentOrganizationContext";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

ReactDOM.render(
  <React.StrictMode>
    <CurrentOrganizationProvider>
      <CurrentUserProvider>
        <App />
      </CurrentUserProvider>
    </CurrentOrganizationProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();

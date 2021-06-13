import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import { CurrentUserProvider } from "./Contexts/currentUserContext";
import { CurrentOrganizationProvider } from "./Contexts/currentOrganizationContext";
//Material UI Theme Provider that is the wrapper for the Material-UI theme:
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";
import "./components/design/theme.css";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CurrentUserProvider>
        <CurrentOrganizationProvider>
          <App />
        </CurrentOrganizationProvider>
      </CurrentUserProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();

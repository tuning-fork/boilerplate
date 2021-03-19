import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import CurrentUserContext, {
  CurrentUserProvider,
} from "./Contexts/currentUserContext";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserProvider value={{ currentUser: CurrentUserContext.store }}>
      <App />
    </CurrentUserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();

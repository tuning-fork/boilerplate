import React from "react";
import ReactDOM from "react-dom";
import { Suspense } from "react";
import { NetworkErrorBoundary } from "rest-hooks";
import { CacheProvider } from "rest-hooks";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import { CurrentUserProvider } from "./Contexts/currentUserContext";
import { CurrentOrganizationProvider } from "./Contexts/currentOrganizationContext";
import "./Components/design.css";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

ReactDOM.render(
  <React.StrictMode>
    <CacheProvider>
      <CurrentUserProvider>
        <CurrentOrganizationProvider>
          <Suspense fallback={<p>LOADING...</p>}>
            <NetworkErrorBoundary>
              <App />
            </NetworkErrorBoundary>
          </Suspense>
        </CurrentOrganizationProvider>
      </CurrentUserProvider>
    </CacheProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();

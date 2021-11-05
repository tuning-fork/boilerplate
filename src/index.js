import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { NetworkErrorBoundary, CacheProvider } from "rest-hooks";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import { CurrentUserProvider } from "./Contexts/currentUserContext";
import { CurrentOrganizationProvider } from "./Contexts/currentOrganizationContext";
import { PasteBoilerplateContentPopoutProvider } from "./Components/PasteBoilerplateContentPopout/PasteBoilerplateContentPopoutContext";
import "./Components/design.css";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

ReactDOM.render(
  <React.StrictMode>
    <CacheProvider>
      <PasteBoilerplateContentPopoutProvider>
        <CurrentUserProvider>
          <CurrentOrganizationProvider>
            <Suspense fallback={<p>Loading...</p>}>
              <NetworkErrorBoundary>
                <App />
              </NetworkErrorBoundary>
            </Suspense>
          </CurrentOrganizationProvider>
        </CurrentUserProvider>
      </PasteBoilerplateContentPopoutProvider>
    </CacheProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();

import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { NetworkErrorBoundary, CacheProvider } from "rest-hooks";
import axios from "axios";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { PasteBoilerplateContentPopoutProvider } from "./Components/PasteBoilerplateContentPopout/PasteBoilerplateContentPopoutContext";
import Spinner from "./Components/Helpers/Spinner";
import "./Components/design.css";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:4000/" : "/";

ReactDOM.render(
  <React.StrictMode>
    <CacheProvider>
      <Suspense fallback={<Spinner />}>
        <NetworkErrorBoundary>
          <PasteBoilerplateContentPopoutProvider>
            <App />
          </PasteBoilerplateContentPopoutProvider>
        </NetworkErrorBoundary>
      </Suspense>
    </CacheProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();

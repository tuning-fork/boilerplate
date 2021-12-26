import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { NetworkErrorBoundary, CacheProvider } from "rest-hooks";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Spinner from "./Components/Helpers/Spinner";
import "./Components/design.css";

ReactDOM.render(
  <React.StrictMode>
    <CacheProvider>
      <Suspense fallback={<Spinner />}>
        <NetworkErrorBoundary>
          <App />
        </NetworkErrorBoundary>
      </Suspense>
    </CacheProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();

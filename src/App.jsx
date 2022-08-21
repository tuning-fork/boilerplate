import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { CurrentUserProvider } from "./Contexts/currentUserContext";
import OrganizationRoutes from "./routes/OrganizationRoutes";
import { PrivateRoute } from "./Components/Helpers/PrivateRoute";
import Spinner from "./Components/Helpers/Spinner";
import Splashpage from "./Components/Splashpage";
import ResetPassword from "./Components/Login/ResetPassword/ResetPassword";
import OrganizationIndex from "./Components/Organizations/OrganizationIndex";
import OrganizationNew from "./Components/Organizations/OrganizationNew";
import NotFoundPage from "./pages/NotFound/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner size="md" centered />}>
        <CurrentUserProvider>
          <Switch>
            <Route exact path="/">
              <Redirect to="/splashpage" />
            </Route>
            <Route path="/splashpage" component={Splashpage} />
            <Route path="/reset_password" component={ResetPassword} />
            <PrivateRoute
              exact
              path="/organizations"
              component={OrganizationIndex}
            />
            <PrivateRoute
              exact
              path="/organizations/new"
              component={OrganizationNew}
            />
            <PrivateRoute path="/organizations/:organizationId">
              <OrganizationRoutes />
            </PrivateRoute>
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </CurrentUserProvider>
      </Suspense>
    </BrowserRouter>
  );
}

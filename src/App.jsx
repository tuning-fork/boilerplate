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
import AcceptInvitationPage from "./pages/AcceptInvitation/AcceptInvitationPage";
import TeamPage from "./pages/Team/TeamPage";
import TeamMemberPage from "./pages/TeamMember/TeamMemberPage";
import ContactPage from "./pages/Contact/ContactPage";
import FeaturesPage from "./pages/Features/FeaturesPage";
import SignUpPage from "./pages/SignUp/SignUpPage";

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
            <Route path="/team" component={TeamPage} exact />
            <Route path="/team/:memberId" component={TeamMemberPage} />
            <Route path="/features" component={FeaturesPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/signup" component={SignUpPage} />
            {/* <Route path="/login" component={ContactPage} /> */}
            {/* <Route path="/forgot_password" component={ContactPage} /> */}
            <Route path="/reset_password" component={ResetPassword} />
            <Route path="/accept_invite" component={AcceptInvitationPage} />
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

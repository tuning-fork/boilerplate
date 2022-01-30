import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { PrivateRoute } from "./Components/Helpers/PrivateRoute";
import LandingPage from "./Components/LandingPage";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import ResetPassword from "./Components/ResetPassword";
import ForgotPassword from "./Components/ForgotPassword";
import OrgSelect from "./Components/OrgSelect";
import Dashboard from "./Components/Dashboard";
import BoilerplatesIndex from "./Components/Boilerplates/BoilerplatesIndex";
import CategoriesIndex from "./Components/Categories/CategoriesIndex";
import Organizations from "./Components/Organizations";
import GrantsIndex from "./Components/Grants/GrantsIndex";
import FundingOrgsIndex from "./Components/FundingOrgs/FundingOrgsIndex";
import BoilerplatesShow from "./Components/BoilerplatesShow";
import FundingOrgsShow from "./Components/FundingOrgsShow";
import OrganizationsShow from "./Components/OrganizationsShow";
import ReportsShow from "./Components/ReportsShow";
import GrantsShow from "./Components/Grants/GrantsShow";
import ReportsFinalizeShow from "./Components/ReportsFinalizeShow";
import BoilerplatesNew from "./Components/BoilerplatesNew";
import FundingOrgsNew from "./Components/FundingOrgs/FundingOrgNew";
import OrganizationsNew from "./Components/OrganizationsNew";
import GrantsNew from "./Components/Grants/GrantsNew";
import SectionsNew from "./Components/SectionsNew";
import ReportsNew from "./Components/ReportsNew";
import BoilerplatesEdit from "./Components/BoilerplatesEdit";
import GrantEdit from "./Components/Grants/GrantEdit";
import GrantCopy from "./Components/Grants/GrantCopy";
import OrganizationLayout from "./Components/Layouts/OrganizationLayout/OrganizationLayout";
import Spinner from "./Components/Helpers/Spinner";
import { CurrentOrganizationProvider } from "./Contexts/currentOrganizationContext";
import { CurrentUserProvider } from "./Contexts/currentUserContext";
import Logout from "./pages/Logout";
import { PasteBoilerplateContentPopoutProvider } from "./Components/PasteBoilerplateContentPopout/PasteBoilerplateContentPopoutContext";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <CurrentUserProvider>
          <Route exact path="/">
            <Redirect to="/landing_page" />
          </Route>
          <Route path="/landing_page" component={LandingPage} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/reset_password" component={ResetPassword} />
          <Route path="/forgot_password" component={ForgotPassword} />
          <CurrentOrganizationProvider>
            <PrivateRoute path="/organizations/:organizationId/">
              <OrganizationLayout>
                <Suspense fallback={<Spinner size="md" centered />}>
                  <Switch>
                    <Route
                      path="/organizations/:organizationId/dashboard"
                      component={Dashboard}
                    />
                    <PrivateRoute
                      path="/organizations/:organizationId/edit"
                      component={OrganizationsShow}
                    />
                    <PrivateRoute
                      path="/organizations/:organizationId/grants/:grant_id/edit"
                      component={GrantEdit}
                    />
                    <PrivateRoute
                      path="/organizations/:organizationId/grants/:grant_id/copy"
                      component={GrantCopy}
                    />
                    <PrivateRoute
                      path="/organizations/:organizationId/grants/:grant_id"
                      component={() => (
                        <PasteBoilerplateContentPopoutProvider>
                          <GrantsShow />
                        </PasteBoilerplateContentPopoutProvider>
                      )}
                    />
                    <PrivateRoute
                      path="/organizations/:organizationId/grants-new"
                      component={GrantsNew}
                    />
                    <PrivateRoute
                      path="/organizations/:organizationId/grants/:grant_id/sections-new"
                      component={SectionsNew}
                    />
                    <PrivateRoute
                      path={
                        "/organizations/:organizationId/grants/:grant_id/reports/:report_id"
                      }
                      component={ReportsShow}
                    />
                    <PrivateRoute
                      path={
                        "/organizations/:organizationId/grants/:grant_id/reports-finalize/:report_id"
                      }
                      component={ReportsFinalizeShow}
                    />
                    <PrivateRoute
                      path="/organizations/:organizationId/grants/:grant_id/reports-new"
                      component={ReportsNew}
                    />
                    <PrivateRoute
                      path="/organizations/:organizationId/grants/"
                      component={GrantsIndex}
                    />
                    <PrivateRoute
                      path="/organizations/:organizationId/boilerplates/:boilerplate_id"
                      component={BoilerplatesShow}
                    />
                    <PrivateRoute
                      path={
                        "/organizations/:organizationId/boilerplates-edit/:boilerplate_id"
                      }
                      component={BoilerplatesEdit}
                    />
                    <PrivateRoute
                      path="/organizations/:organizationId/funding_orgs/:funding_org_id"
                      component={FundingOrgsShow}
                    />
                    <PrivateRoute
                      path="/organizations/:organizationId/boilerplates-new"
                      component={BoilerplatesNew}
                    />
                    <PrivateRoute
                      path="/organizations/:organizationId/boilerplates"
                      component={BoilerplatesIndex}
                    />
                    <PrivateRoute
                      path="/organizations/:organizationId/categories"
                      component={CategoriesIndex}
                    />
                    <PrivateRoute
                      path="/organizations/:organizationId/funding_orgs-new"
                      component={FundingOrgsNew}
                    />
                    <PrivateRoute
                      path="/organizations/:organizationId/funding_orgs"
                      component={FundingOrgsIndex}
                    />
                    <Redirect to="/organizations/:organizationId/dashboard" />
                  </Switch>
                </Suspense>
              </OrganizationLayout>
            </PrivateRoute>
            <PrivateRoute path="/org_select" component={OrgSelect} />
            <PrivateRoute
              exact
              path="/organizations"
              component={Organizations}
            />
            <PrivateRoute
              exact
              path="/organizations-new"
              component={OrganizationsNew}
            />
          </CurrentOrganizationProvider>
        </CurrentUserProvider>
      </Switch>
    </BrowserRouter>
  );
}

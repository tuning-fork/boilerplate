import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { QueryClientProvider } from "react-query";

import reactQueryClient from "./config/reactQueryClient";
import { CurrentOrganizationProvider } from "./contexts/currentOrganizationContext";
import { CurrentUserProvider } from "./contexts/currentUserContext";
import { PasteBoilerplateContentPopoutProvider } from "./pages/OrganizationShow/GrantShow/PasteBoilerplateContentPopout/PasteBoilerplateContentPopoutContext";
import { PrivateRoute } from "./components/PrivateRoute";
import OrganizationLayout from "./components/layouts/OrganizationLayout/OrganizationLayout";
import Spinner from "./components/Spinner/Spinner";

import BoilerplateShowPage from "./pages/OrganizationShow/BoilerplateShow/BoilerplateShowPage";
import BoilerplatesIndexPage from "./pages/OrganizationShow/BoilerplatesIndex/BoilerplatesIndexPage";
import BoilerplatesNewPage from "./pages/OrganizationShow/BoilerplatesNew/BoilerplatesNewPage";
import CategoriesIndexPage from "./pages/OrganizationShow/CategoriesIndex/CategoriesIndexPage";
import DashboardPage from "./pages/OrganizationShow/Dashboard/DashboardPage";
import FundingOrgNewPage from "./pages/OrganizationShow/FundingOrgsNew/FundingOrgsNewPage";
import FundingOrgsIndexPage from "./pages/OrganizationShow/FundingOrgsIndex/FundingOrgsIndexPage";
import GrantCopyPage from "./pages/OrganizationShow/GrantCopy/GrantCopyPage";
import GrantEditPage from "./pages/OrganizationShow/GrantEdit/GrantEditPage";
import GrantShowPage from "./pages/OrganizationShow/GrantShow/GrantShowPage";
import GrantsIndexPage from "./pages/OrganizationShow/GrantsIndex/GrantsIndexPage";
import GrantsNewPage from "./pages/OrganizationShow/GrantsNew/GrantsNewPage";
import OrganizationsIndexPage from "./pages/OrganizationsIndex/OrganizationsIndexPage";
import OrganizationsNewPage from "./pages/OrganizationsNew/OrganizationsNewPage";
import OrganizationsSelectPage from "./pages/OrganizationsSelect/OrganizationsSelectPage";
import ReportShowPage from "./pages/OrganizationShow/ReportShow/ReportShowPage";
import ReportsNewPage from "./pages/OrganizationShow/ReportsNew/ReportsNewPage";
import ResetPasswordPage from "./pages/ResetPassword/ResetPasswordPage";
import SplashPage from "./pages/SplashPage/SplashPage";
import StayTunedPage from "./pages/StayTuned/StayTunedPage";

export default function App() {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <BrowserRouter>
        <Switch>
          <CurrentUserProvider>
            <Route exact path="/">
              <Redirect to="/splashpage" />
            </Route>
            <Route path="/splashpage" component={SplashPage} />
            <Route path="/reset_password" component={ResetPasswordPage} />
            <CurrentOrganizationProvider>
              <PrivateRoute
                path="/org_select"
                component={OrganizationsSelectPage}
              />
              <PrivateRoute
                exact
                path="/organizations"
                component={OrganizationsIndexPage}
              />
              <PrivateRoute
                exact
                path="/organizations-new"
                component={OrganizationsNewPage}
              />
              <PrivateRoute path="/organizations/:organizationId/">
                <OrganizationLayout>
                  {/* TODO: Consider moving suspense into organization layout */}
                  <Suspense fallback={<Spinner size="md" centered />}>
                    <Switch>
                      <Route
                        path="/organizations/:organizationId/dashboard"
                        component={DashboardPage}
                      />
                      {/* TODO: Rename grant_id -> grantId (also report & boilerplate id) */}
                      <Route
                        path="/organizations/:organizationId/grants/:grant_id/reports/:report_id"
                        component={ReportShowPage}
                      />
                      {/* TODO: Consider having new be at the end -> /grant_id/reports/new */}
                      <Route
                        path="/organizations/:organizationId/grants/:grant_id/reports-new"
                        component={ReportsNewPage}
                      />
                      <Route
                        path="/organizations/:organizationId/grants/:grant_id/edit"
                        component={GrantEditPage}
                      />
                      <Route
                        path="/organizations/:organizationId/grants/:grant_id/copy"
                        component={GrantCopyPage}
                      />
                      {/* TODO: See if paste boilerplate popout can be moved out of here */}
                      <Route
                        path="/organizations/:organizationId/grants/:grant_id"
                        component={() => (
                          <PasteBoilerplateContentPopoutProvider>
                            <GrantShowPage />
                          </PasteBoilerplateContentPopoutProvider>
                        )}
                      />
                      <Route
                        path="/organizations/:organizationId/grants-new"
                        component={GrantsNewPage}
                      />
                      <Route
                        path="/organizations/:organizationId/grants/"
                        component={GrantsIndexPage}
                      />
                      <Route
                        path="/organizations/:organizationId/boilerplates/:boilerplate_id"
                        component={BoilerplateShowPage}
                      />
                      <Route
                        path="/organizations/:organizationId/boilerplates-new"
                        component={BoilerplatesNewPage}
                      />
                      <Route
                        path="/organizations/:organizationId/boilerplates"
                        component={BoilerplatesIndexPage}
                      />
                      <Route
                        path="/organizations/:organizationId/categories"
                        component={CategoriesIndexPage}
                      />
                      <Route
                        path="/organizations/:organizationId/funding_orgs-new"
                        component={FundingOrgNewPage}
                      />
                      <Route
                        path="/organizations/:organizationId/funding_orgs"
                        component={FundingOrgsIndexPage}
                      />
                      <Route
                        path="/organizations/:organizationId/users"
                        component={StayTunedPage}
                      />
                      <Route
                        path="/organizations/:organizationId/reports"
                        component={StayTunedPage}
                      />
                      <Redirect to="/organizations/:organizationId/dashboard" />
                    </Switch>
                  </Suspense>
                </OrganizationLayout>
              </PrivateRoute>
            </CurrentOrganizationProvider>
          </CurrentUserProvider>
        </Switch>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

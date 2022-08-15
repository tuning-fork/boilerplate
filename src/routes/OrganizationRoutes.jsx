import { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { CurrentOrganizationProvider } from "../contexts/currentOrganizationContext";
import { PasteBoilerplateContentPopoutProvider } from "../components/PasteBoilerplateContentPopout/PasteBoilerplateContentPopoutContext";
import OrganizationLayout from "../components/Layouts/OrganizationLayout/OrganizationLayout";
import OrganizationLayoutFallback from "../components/Layouts/OrganizationLayout/OrganizationLayoutFallback";
import BoilerplatesIndex from "../components/Boilerplates/BoilerplatesIndex";
import BoilerplatesNew from "../components/Boilerplates/BoilerplatesNew";
import BoilerplatesShow from "../components/Boilerplates/BoilerplatesShow";
import CategoriesIndex from "../components/Categories/CategoriesIndex";
import Dashboard from "../components/Dashboard";
import FundingOrgNew from "../components/FundingOrgs/FundingOrgNew";
import FundingOrgsIndex from "../components/FundingOrgs/FundingOrgsIndex";
import GrantCopy from "../components/Grants/GrantCopy";
import GrantEdit from "../components/Grants/GrantEdit";
import GrantShow from "../components/Grants/GrantsShow";
import GrantsIndex from "../components/Grants/GrantsIndex";
import GrantsNew from "../components/Grants/GrantsNew";
import ReportsNew from "../components/Reports/ReportsNew";
import ReportsShow from "../components/Reports/ReportsShow";
import RedirectToDashboard from "../components/Helpers/RedirectToDashboard";
import StayTunedPage from "../pages/StayTuned/StayTunedPage";

export default function OrganizationRoutes() {
  return (
    <Suspense fallback={<OrganizationLayoutFallback />}>
      <CurrentOrganizationProvider>
        <OrganizationLayout>
          <Switch>
            <Route
              exact
              path="/organizations/:organizationId/dashboard"
              component={Dashboard}
            />
            <Route
              path="/organizations/:organizationId/grants/:grantId/edit"
              component={GrantEdit}
            />
            <Route
              path="/organizations/:organizationId/grants/:grantId/copy"
              component={GrantCopy}
            />
            <Route
              exact
              path="/organizations/:organizationId/grants/:grantId"
              render={() => (
                <PasteBoilerplateContentPopoutProvider>
                  <GrantShow />
                </PasteBoilerplateContentPopoutProvider>
              )}
            />
            <Route
              path="/organizations/:organizationId/grants-new"
              component={GrantsNew}
            />
            <Route
              exact
              path={
                "/organizations/:organizationId/grants/:grantId/reports/:reportId"
              }
              component={ReportsShow}
            />
            <Route
              path="/organizations/:organizationId/grants/:grantId/reports-new"
              component={ReportsNew}
            />
            <Route
              path="/organizations/:organizationId/grants/"
              component={GrantsIndex}
            />
            <Route
              path="/organizations/:organizationId/boilerplates/:boilerplateId"
              component={BoilerplatesShow}
            />
            <Route
              path="/organizations/:organizationId/boilerplates-new"
              component={BoilerplatesNew}
            />
            <Route
              path="/organizations/:organizationId/boilerplates"
              component={BoilerplatesIndex}
            />
            <Route
              path="/organizations/:organizationId/categories"
              component={CategoriesIndex}
            />
            <Route
              path="/organizations/:organizationId/funding_orgs-new"
              component={FundingOrgNew}
            />
            <Route
              path="/organizations/:organizationId/funding_orgs"
              component={FundingOrgsIndex}
            />
            <Route
              path="/organizations/:organizationId/users"
              component={StayTunedPage}
            />
            <Route path="*">
              <RedirectToDashboard />
            </Route>
          </Switch>
        </OrganizationLayout>
      </CurrentOrganizationProvider>
    </Suspense>
  );
}

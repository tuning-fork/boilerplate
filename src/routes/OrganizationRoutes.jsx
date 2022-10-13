import { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { CurrentOrganizationProvider } from "../Contexts/currentOrganizationContext";
import { PasteBoilerplateContentPopoutProvider } from "../Components/PasteBoilerplateContentPopout/PasteBoilerplateContentPopoutContext";
import OrganizationLayout from "../Components/Layouts/OrganizationLayout/OrganizationLayout";
import OrganizationLayoutFallback from "../Components/Layouts/OrganizationLayout/OrganizationLayoutFallback";
import BoilerplatesIndex from "../Components/Boilerplates/BoilerplatesIndex";
import BoilerplatesNew from "../Components/Boilerplates/BoilerplatesNew";
import BoilerplatesShow from "../Components/Boilerplates/BoilerplatesShow";
import CategoriesIndex from "../Components/Categories/CategoriesIndex";
import Dashboard from "../Components/Dashboard";
import FundingOrgNew from "../Components/FundingOrgs/FundingOrgNew";
import FundingOrgsIndex from "../Components/FundingOrgs/FundingOrgsIndex";
import GrantCopy from "../Components/Grants/GrantCopy";
import GrantEdit from "../Components/Grants/GrantEdit";
import GrantShow from "../Components/Grants/GrantsShow";
import GrantShowOverview from "../Components/Grants/GrantShowOverview";
import GrantsIndex from "../Components/Grants/GrantsIndex";
import GrantsNew from "../Components/Grants/GrantsNew";
import ReportsNew from "../Components/Reports/ReportsNew";
import ReportsShow from "../Components/Reports/ReportsShow";
import RedirectToDashboard from "../Components/Helpers/RedirectToDashboard";
import UserIndexPage from "../pages/UserIndex/UserIndexPage";

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
              path="/organizations/:organizationId/grants/:grantId/overview"
              component={GrantShowOverview}
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
              component={UserIndexPage}
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

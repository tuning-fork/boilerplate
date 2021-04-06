import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import { useCurrentUserContext } from "./Contexts/currentUserContext";
import { useCurrentOrganizationContext } from "./Contexts/currentOrganizationContext";

import React, { Component, useEffect } from "react";
// import Container from 'react-bootstrap/Container';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { PrivateRoute } from "./Components/Helpers/PrivateRoute";

import LandingPage from "./Components/LandingPage";

import Signup from "./Components/Signup";
import Login from "./Components/Login";
import ResetPassword from "./Components/ResetPassword";
import ForgotPassword from "./Components/ForgotPassword";

import Dashboard from "./Components/Dashboard";
import Navigation from "./Components/Navigation";

import Header from "./Components/Header";
import Footer from "./Components/Footer";

import Bios from "./Components/Bios";
import Boilerplates from "./Components/Boilerplates";
import Categories from "./Components/Categories";
import Organizations from "./Components/Organizations";
import Grants from "./Components/Grants";
// import Reports from './Components/Reports';

import FundingOrgs from "./Components/FundingOrgs";
// import Sections from './Components/Sections';
// import ReportSections from './Components/ReportSections';

import BiosShow from "./Components/BiosShow";
import BoilerplatesShow from "./Components/BoilerplatesShow";
import CategoriesShow from "./Components/CategoriesShow";
import FundingOrgsShow from "./Components/FundingOrgsShow";
import OrganizationsShow from "./Components/OrganizationsShow";
import GrantsShow from "./Components/GrantsShow";
import ReportsShow from "./Components/ReportsShow";
// import OrganizationUser from './Components/OrganizationUsers'

import GrantsFinalizeShow from "./Components/GrantsFinalizeShow";
import ReportsFinalizeShow from "./Components/ReportsFinalizeShow";

// import GrantsPrintableShow from './Components/GrantsPrintableShow';
// import ReportsPrintableShow from './Components/ReportsPrintableShow';

import BiosNew from "./Components/BiosNew";
import BoilerplatesNew from "./Components/BoilerplatesNew";
import CategoriesNew from "./Components/CategoriesNew";
import FundingOrgsNew from "./Components/FundingOrgsNew";
import OrganizationsNew from "./Components/OrganizationsNew";
import GrantsNew from "./Components/GrantsNew";
import SectionsNew from "./Components/SectionsNew";
import ReportsNew from "./Components/ReportsNew";
// import ReportSectionsNew from './Components/ReportSectionsNew';

export default function App() {
  const [state, dispatch] = useCurrentUserContext();
  const [state, dispatch] = useCurrentOrganizationContext();
  useEffect(() => {
    console.log("local storage id:", localStorage.user_id);
    if (localStorage.user_id && state.currentUserInfo === null) {
      axios({
        method: "get",
        url: `/api/users/${localStorage.user_id}`,
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
        .then((response) => {
          if (response.data) {
            dispatch({ type: "SET_CURRENT_USER_INFO", payload: response.data });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (localStorage.user_id && state.currentOrganizationInfo === null) {
      axios({
        method: "get",
        url: `/api/organizations/${}`,
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
        .then((response) => {
          if (response.data) {
            dispatch({ type: "SET_CURRENT_ORGANIZATION_INFO", payload: response.data });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        {/* <Header /> */}
        <Switch>
          <Route exact path="/">
            <Redirect to="/landing_page" />
          </Route>
          <Route path={"/landing_page"} component={LandingPage} />
          <Route path={"/signup"} component={Signup} />
          <Route path={"/login"} component={Login} />
          <Route path={"/reset_password"} component={ResetPassword} />
          <Route path={"/forgot_password"} component={ForgotPassword} />

          <PrivateRoute path={"/dashboard"} component={Dashboard} />
          <PrivateRoute exact path={"/grants"} component={Grants} />
          <PrivateRoute path={"/grants/:id"} component={GrantsShow} />
          <PrivateRoute
            path={"/grants-finalize/:id"}
            component={GrantsFinalizeShow}
          />
          <PrivateRoute path={"/grants-new"} component={GrantsNew} />
          <PrivateRoute path={"/sections-new"} component={SectionsNew} />

          <PrivateRoute path={"/reports/:id"} component={ReportsShow} />
          <PrivateRoute
            path={"/reports-finalize/:id"}
            component={ReportsFinalizeShow}
          />

          <PrivateRoute path={"/reports-new"} component={ReportsNew} />
          <PrivateRoute exact path={"/categories"} component={Categories} />
          <PrivateRoute
            exact
            path={"/organizations"}
            component={Organizations}
          />
          <PrivateRoute exact path={"/funding_orgs"} component={FundingOrgs} />
          <PrivateRoute exact path={"/bios"} component={Bios} />
          <PrivateRoute path={"/bios/:id"} component={BiosShow} />
          <PrivateRoute exact path={"/boilerplates"} component={Boilerplates} />
          <PrivateRoute
            path={"/boilerplates/:id"}
            component={BoilerplatesShow}
          />
          <PrivateRoute path={"/categories/:id"} component={CategoriesShow} />
          <PrivateRoute
            path={"/funding_orgs/:id"}
            component={FundingOrgsShow}
          />
          <PrivateRoute
            path={"/organizations/:id"}
            component={OrganizationsShow}
          />

          <PrivateRoute path={"/bios-new"} component={BiosNew} />
          <PrivateRoute
            path={"/boilerplates-new"}
            component={BoilerplatesNew}
          />
          <PrivateRoute path={"/categories-new"} component={CategoriesNew} />
          <PrivateRoute path={"/funding_orgs-new"} component={FundingOrgsNew} />
          <PrivateRoute
            path={"/organizations-new"}
            component={OrganizationsNew}
          />
          {/* <Route
              exact path={"/logout"} component={Logout}
            /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

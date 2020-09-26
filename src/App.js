import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Signup from './Components/Signup';
import Login from './Components/Login';

import Dashboard from './Components/Dashboard';

import Navigation from './Components/Navigation';

import Header from './Components/Header';
import Footer from './Components/Footer';

import Bios from './Components/Bios';
import Boilerplates from './Components/Boilerplates';
import Categories from './Components/Categories';
import Organizations from './Components/Organizations';
import Grants from './Components/Grants';
import Reports from './Components/Reports';

import FundingOrgs from './Components/FundingOrgs';
// import Sections from './Components/Sections';
// import ReportSections from './Components/ReportSections';

import BiosShow from './Components/BiosShow';
import BoilerplatesShow from './Components/BoilerplatesShow';
// import CategoriesShow from './Components/CategoriesShow';
// import FundingOrgsShow from './Components/FundingOrgsShow';
import GrantsShow from './Components/GrantsShow';
import ReportsShow from './Components/ReportsShow';

import GrantsFinalizeShow from './Components/GrantsFinalizeShow';
import ReportsFinalizeShow from './Components/ReportsFinalizeShow';

import GrantsPrintableShow from './Components/GrantsPrintableShow';
import ReportsPrintableShow from './Components/ReportsPrintableShow';

import BiosNew from './Components/BiosNew';
import BoilerplatesNew from './Components/BoilerplatesNew';
import CategoriesNew from './Components/CategoriesNew';
import FundingOrgsNew from './Components/FundingOrgsNew';
// import GrantsNew from './Components/GrantsNew';
import SectionsNew from './Components/SectionsNew';
import ReportsNew from './Components/ReportsNew';
import ReportSectionsNew from './Components/ReportSectionsNew';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
    };

  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Navigation />
          <Header />
          <Switch>
            <Route exact path="/">
              <Redirect to="/" />
            </Route>
            <Route exact path={'/signup'} component={Signup} />
            <Route exact path={'/login'} component={Login} />
            <Route exact path={'/dashboard'} component={Dashboard}/>
            <Route exact path={'/grants'} component={Grants} />
            <Route exact path={'/grants/:id'} component={GrantsShow} />
            <Route exact path={'/grants/:id/finalize'} component={GrantsFinalizeShow} />
            <Route exact path={'/grants/:id/printable'} component={GrantsPrintableShow} />
            <Route exact path={'/reports'} component={Reports} />
            <Route exact path={'/reports/:id'} component={ReportsShow} />
            <Route exact path={'/reports/new'} component={ReportsNew} />
            <Route exact path={'/reports/:id/finalize'} component={ReportsFinalizeShow} />
            <Route exact path={'/reports/:id/printable'} component={ReportsPrintableShow} />
            <Route exact path={'/categories'} component={Categories} />
            <Route exact path={'/organizations'} component={Organizations} />
            <Route exact path={'/funding_orgs'} component={FundingOrgs} />
            <Route exact path={'/bios'} component={Bios} />
            <Route exact path={'/bios/:id'} component={BiosShow} />
            <Route exact path={'/boilerplates'} component={Boilerplates} />
            <Route exact path={'/boilerplates/:id'} component={BoilerplatesShow} />

            {/* <Route
              exact path={"/logout"} component={Logout}
            /> */}
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}



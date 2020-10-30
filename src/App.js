import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
// import Reports from './Components/Reports';

import FundingOrgs from './Components/FundingOrgs';
// import Sections from './Components/Sections';
// import ReportSections from './Components/ReportSections';

import BiosShow from './Components/BiosShow';
import BoilerplatesShow from './Components/BoilerplatesShow';
import CategoriesShow from './Components/CategoriesShow';
import FundingOrgsShow from './Components/FundingOrgsShow';
import OrganizationsShow from './Components/OrganizationsShow';
import GrantsShow from './Components/GrantsShow';
import ReportsShow from './Components/ReportsShow';
// import OrganizationUser from './Components/OrganizationUsers'


import GrantsFinalizeShow from './Components/GrantsFinalizeShow';
import ReportsFinalizeShow from './Components/ReportsFinalizeShow';

// import GrantsPrintableShow from './Components/GrantsPrintableShow';
// import ReportsPrintableShow from './Components/ReportsPrintableShow';

import BiosNew from './Components/BiosNew';
import BoilerplatesNew from './Components/BoilerplatesNew';
import CategoriesNew from './Components/CategoriesNew';
import FundingOrgsNew from './Components/FundingOrgsNew';
import OrganizationsNew from './Components/OrganizationsNew';
import GrantsNew from './Components/GrantsNew';
import SectionsNew from './Components/SectionsNew';
// import ReportsNew from './Components/ReportsNew';
// import ReportSectionsNew from './Components/ReportSectionsNew';

export default class App extends Component {
  // constructor() {
    // console.log(ReportsShow);
    // super();

    // this.state = {
    //   user: {},
    // };

  // }

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
            <Route path={'/signup'} component={Signup} />
            <Route path={'/login'} component={Login} />
            <Route path={'/dashboard'} component={Dashboard}/>
            <Route exact path={'/grants'} component={Grants} />
            <Route path={'/grants/:id'} component={GrantsShow} />
            <Route path={'/grants-finalize/:id'} component={GrantsFinalizeShow} />
            <Route path={'/grants-new'} component={GrantsNew} />
            <Route path={'/sections-new'} component={SectionsNew} />
            
            <Route path={'/reports/:id'} component={ReportsShow}/>
            <Route path={'/reports-finalize/:id'} component={ReportsFinalizeShow}/>
             
            {/* <Route path={'/reports/new'} component={ReportsNew} /> */}
            <Route exact path={'/categories'} component={Categories} />
            <Route exact path={'/organizations'} component={Organizations} />
            <Route exact path={'/funding_orgs'} component={FundingOrgs} />
            <Route exact path={'/bios'} component={Bios} />
            <Route path={'/bios/:id'} component={BiosShow} />
            <Route exact path={'/boilerplates'} component={Boilerplates} />
            <Route path={'/boilerplates/:id'} component={BoilerplatesShow} />
            <Route path={'/categories/:id'} component={CategoriesShow} />
            <Route path={'/funding_orgs/:id'} component={FundingOrgsShow} />
            <Route path={'/organizations/:id'} component={OrganizationsShow} />

            <Route path={'/bios-new'} component={BiosNew} />
            <Route path={'/boilerplates-new'} component={BoilerplatesNew} />
            <Route path={'/categories-new'} component={CategoriesNew} />
            <Route path={'/funding_orgs-new'} component={FundingOrgsNew} />
            <Route path={'/organizations-new'} component={OrganizationsNew} />
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



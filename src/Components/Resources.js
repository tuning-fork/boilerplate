import React, { Component } from 'react';
import CurrentUser from './CurrentUser';
import Bios from './Bios';
import Boilerplates from './Boilerplates';
import Categories from './Categories';
import Organizations from './Organizations';
import FundingOrgs from './FundingOrgs';

class Resources extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="component container">
        <CurrentUser />
        <Bios />
        <Boilerplates />
        <Categories />
        <FundingOrgs />
        <Organizations />
      </div>
    );
  }
}

export default Resources;
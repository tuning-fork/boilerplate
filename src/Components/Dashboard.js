import React, { Component } from 'react';
import CurrentUser from './CurrentUser';
// import OrganizationUser from './OrganizationUser';
// import { Link } from 'react-router-dom';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="component">
        <CurrentUser history={this.props.history} />
        <br />
        {/* <Link to="/grants-new">
          <button className="btn-lg">Add New Grant</button>
        </Link> */}
        <br />
        <br />
        {/* <OrganizationUser /> */}
      </div>
    );
  }
}

export default Dashboard;

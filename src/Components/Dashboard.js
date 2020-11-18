import React, { Component } from 'react';
import CurrentUser from './CurrentUser';

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
        <CurrentUser />
      </div>
    );
  }
}

export default Dashboard;

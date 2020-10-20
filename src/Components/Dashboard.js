import React, { Component } from 'react';
import CurrentUser from './CurrentUser';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="container">
      <CurrentUser history={this.props.history} />
        <br />
        <Link to="/grants-new">
          <button className="btn-lg">Add New Grant</button>
        </Link>
      </div>
    );
  }
}

export default Dashboard;

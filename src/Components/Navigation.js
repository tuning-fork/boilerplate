import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Navigation extends Component {
  state = {};
  constructor(props) {
    super(props);

    // this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  // handleLogoutClick() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user_id');
  //   this.props.history.push('/login');
  // }

  render() {
    return (
      <div>
        <nav
          className="navbar fixed-top navbar-expand-lg navbar-light"
        >
          <div className="navbar-nav">
              <ul className="nav">
                <li className="nav-item">
                  <Link className="navbar-brand" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="navbar-brand" to="/signup">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link className="navbar-brand" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="navbar-brand" to="/grants">Grants</Link>
                </li>
                <li className="nav-item">
                  <Link className="navbar-brand" to="/bios">Bios</Link>
                </li>
                <li className="nav-item">
                  <Link className="navbar-brand" to="/boilerplates">Boilerplates</Link>
                </li>
                <li className="nav-item">
                  <Link className="navbar-brand" to="/categories">Categories</Link>
                </li>
                <li className="nav-item">
                  <Link className="navbar-brand" to="/organizations">Organizations</Link>
                </li>
                <li className="nav-item">
                  <Link className="navbar-brand" to="/funding_orgs">Funding Orgs</Link>
                </li>
              </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Navigation);

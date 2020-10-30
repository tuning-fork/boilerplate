import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {}

    // this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  // handleLogoutClick() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user_id');
  //   this.props.history.push('/login');
  // }

  render() {
    return (
  
        <nav>
          <ul >
            <li className="active">
              <Link to="/login">Login</Link>
            </li>
            <li className="active">
              <Link to="/signup">Sign Up</Link>
            </li>
            <li className="active">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="active">
              <Link to="/grants">Grants</Link>
            </li>
            <li className="active">
              <Link to="/bios">Bios</Link>
            </li>
            <li className="active">
              <Link to="/boilerplates">Boilerplates</Link>
            </li>
            <li className="active">
              <Link to="/categories">Categories</Link>
            </li>
            <li className="active">
              <Link to="/organizations">Organizations</Link>
            </li>
            <li className="active">
              <Link to="/funding_orgs">Funding Orgs</Link>
            </li>
          </ul>
        </nav>
    
    );
  }
}

export default withRouter(Navigation);

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    this.props.history.push('/login');
  }

  render() {
    return (
        <Navbar bg="light" expand="lg" sticky="top">
          <ul>
            {localStorage.token && localStorage.user_id ? (
              <div>
              <Nav>
                <Nav.Link style={{fontSize: "150%"}} className="active">
                  <Link to="/dashboard">Dashboard</Link>
                </Nav.Link>
                <Nav.Link style={{fontSize: "150%"}} className="active">
                  <Link to="/grants">Grants</Link>
                </Nav.Link>
                <Nav.Link style={{fontSize: "150%"}} className="active">
                  <Link to="/bios">Bios</Link>
                </Nav.Link>
                <Nav.Link style={{fontSize: "150%"}} className="active">
                  <Link to="/boilerplates">Boilerplates</Link>
                </Nav.Link>
                <Nav.Link style={{fontSize: "150%"}} className="active">
                  <Link to="/categories">Categories</Link>
                </Nav.Link>
                <Nav.Link style={{fontSize: "150%"}} className="active">
                  <Link to="/organizations">Organizations</Link>
                </Nav.Link>
                <Nav.Link style={{fontSize: "150%"}} className="active">
                  <Link to="/funding_orgs">Funding Orgs</Link>
                </Nav.Link>
                <Nav.Link style={{fontSize: "150%"}}>
                  <Link onClick={this.handleLogoutClick}to="/logout">Logout</Link>
                </Nav.Link>
                </Nav>
                </div>
                ) : (
                <div>
                <Nav>
                <Nav.Link style={{fontSize: "150%"}} className="active">
                  <Link to="/login">Login</Link>
                </Nav.Link>
                <Nav.Link style={{fontSize: "150%"}} className="active">
                  <Link to="/signup">Sign Up</Link>
                </Nav.Link>
                </Nav>
              </div>
            )}
          </ul>
        </Navbar>
    );
  }
}

export default withRouter(Navigation);

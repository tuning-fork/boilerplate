import React, { Component } from 'react';
// import { Link, withRouter } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
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
              <Nav className="mr-auto">
                <Nav.Item style={{fontSize: "150%"}} className="active">
                  <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item style={{fontSize: "150%"}} className="active">
                  <Nav.Link href="/grants">Grants</Nav.Link>
                </Nav.Item>
                <Nav.Item style={{fontSize: "150%"}} className="active">
                  <Nav.Link href="/bios">Bios</Nav.Link>
                </Nav.Item>
                <Nav.Item style={{fontSize: "150%"}} className="active">
                  <Nav.Link href="/boilerplates">Boilerplates</Nav.Link>
                </Nav.Item>
                <Nav.Item style={{fontSize: "150%"}} className="active">
                  <Nav.Link href="/categories">Categories</Nav.Link>
                </Nav.Item>
                <Nav.Item style={{fontSize: "150%"}} className="active">
                  <Nav.Link href="/organizations">Organizations</Nav.Link>
                </Nav.Item>
                <Nav.Item style={{fontSize: "150%"}} className="active">
                  <Nav.Link href="/funding_orgs">Funding Orgs</Nav.Link>
                </Nav.Item>
                <Nav.Item style={{fontSize: "150%"}}>
                  <Nav.Link onClick={this.handleLogoutClick}to="/logout">Logout</Nav.Link>
                </Nav.Item>
                </Nav>
                </div>
                ) : (
                <div>
                <Nav>
                <Nav.Item style={{fontSize: "150%"}} className="active">
                  <Nav.Link href="/login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item style={{fontSize: "150%"}} className="active">
                  <Nav.Link href="/signup">Sign Up</Nav.Link>
                </Nav.Item>
                </Nav>
              </div>
            )}
          </ul>
        </Navbar>
    );
  }
}

export default withRouter(Navigation);

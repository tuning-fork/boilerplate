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
        <Navbar bg="light" expand="lg">
        <Nav>
        {localStorage.token && localStorage.user_id ? (
          <div>
            <Nav.Item className="active">
              <Nav.Link to="/dashboard">Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item className="active">
              <Nav.Link to="/grants">Grants</Nav.Link>
            </Nav.Item>
            <Nav.Item className="active">
              <Nav.Link to="/bios">Bios</Nav.Link>
            </Nav.Item>
            <Nav.Item className="active">
              <Nav.Link to="/boilerplates">Boilerplates</Nav.Link>
            </Nav.Item>
            <Nav.Item className="active">
              <Nav.Link to="/categories">Categories</Nav.Link>
            </Nav.Item>
            <Nav.Item className="active">
              <Nav.Link to="/organizations">Organizations</Nav.Link>
            </Nav.Item>
            <Nav.Item className="active">
              <Nav.Link to="/funding_orgs">Funding Orgs</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={this.handleLogoutClick}to="/logout">Logout</Nav.Link>
            </Nav.Item>
            </div>
            ) : (
            <div>
            <Nav.Item className="active">
              <Nav.Link to="/login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item className="active">
              <Nav.Link to="/signup">Sign Up</Nav.Link>
            </Nav.Item>
          </div>
          )}
        </Nav>
        </Navbar>
    );
  }
}

export default withRouter(Navigation);

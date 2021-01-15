import React, { Component } from 'react';
// import { resetPassword } from '../helpers/passwords';
// import { connect } from 'react-redux';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class ResetPassword extends Component {
  state = {
    token: "",
    email: "",
    password: "",
    password_confirmation: ""
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { password, password_confirmation } = this.state;
    if (password !== password_confirmation) {
      alert("Passwords don't match");
      this.setState({
        password: "",
        password_confirmation: ""
      })
    } else {
      this.resetPassword(this.state)
      this.setState({
        token: "",
        email: "",
        password: "",
        password_confirmation: ""
      })
      this.props.history.push('/login')
    }
  }

  resetPassword = (credentials) => {
  axios
    .post('api/reset_password', credentials)
    .then((response) => {
      if (!!response.error) {
        alert(response.error)
      } else {
        alert(response.message)
      }
    })
    .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="container">
        <Card>
        <Card.Header>
        <p>Reset Password:</p>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label for="token">Token:</Form.Label>
              <Form.Control 
                required id="token" 
                onChange={this.handleChange} 
                name="token" 
                placeholder="token" 
                type="token" 
                value={this.state.token}
              />
              <p>The code that was emailed to you. This is case-sensitive.</p>
            </Form.Group>
            <Form.Group>
              <Form.Label for="email">Email:</Form.Label>
              <Form.Control 
                required 
                id="email" 
                onChange={this.handleChange} 
                name="email" 
                placeholder="email" 
                type="email" 
                value={this.state.email}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label for="password">New password:</Form.Label>
              <Form.Control 
                required 
                id="password" 
                onChange={this.handleChange} 
                name="password" 
                placeholder="password" 
                type="password" 
                value={this.state.password} 
              />
            </Form.Group>
            <Form.Group>
              <Form.Label for="password_confirmation">Confirm new password:</Form.Label>
              <Form.Control 
                required 
                id="password_confirmation" 
                onChange={this.handleChange} 
                name="password_confirmation" 
                placeholder="password confirmation" 
                type="password" 
                value={this.state.password_confirmation}
              />
              <Button type="secondary">Reset Password</Button>
            </Form.Group>
          </Form>
        </Card.Body>
        </Card>
      </div>
    );
  }
}

export default ResetPassword;
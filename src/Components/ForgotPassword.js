import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default class ForgotPassword extends Component {
  state = {
    email: ""
  }

  forgotPassword = (email) => {
    axios
      .post('/api/forgot_password', 
        {email: this.state.email}
      )
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => console.log(error));
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.forgotPassword(this.state.email)
    this.setState({
      email: ""
    })
    // this.props.history.push('/')
  }

  render() {
    return (
    <div className="container">
      <Card className="basic" >
        <Card.Header>
          <p>Enter the email address associated with your Boilerplate account</p>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Password reset request:</Form.Label>
              <Form.Control
                required 
                id="forgotpasswordemail" 
                onChange={this.handleChange} 
                name="email" 
                placeholder="email" 
                type="email" 
                value={this.state.email}
              />
              <Button className="basic" >Submit</Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
    );
  }
}
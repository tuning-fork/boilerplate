import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
      errorType: '',
      errorText: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const { email, password } = this.state;

    // axios
    //   .post(
    //     '/api/sessions',
    //     {
    //       email: email,
    //       password: password
    //     },
    //     {headers: { withCredentials: true }},
    //   )

      axios({
        method: 'post',
        url: '/api/sessions',
        headers: { Authorization: `Bearer ${localStorage.token}` },
        // withCredentials: true,

        data: {email: email, password: password}
      })
      .then((response) => {
        if (response.data) {
          localStorage.setItem('token', response.data.jwt);
          localStorage.setItem('user_id', response.data.user_id);
          this.props.history.push('/dashboard');
        }
      })
      .catch((error) => {
        this.setState({
          errorType: error.response.status,
          errorText: error.response.statusText,
        });
        console.log(error.response);
      });
    event.preventDefault();
  }

  render() {
    return (   
      <div className="container">
        <Card>
          <Card.Header className="card-header" >Welcome to Boilerplate! Please Log In:</Card.Header>
          <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <div>
              <span style={{ color: 'red' }}>
                {this.state.errorType} {this.state.errorText}
              </span>
            </div>
            <div>
              <Button type="submit">
                Login
              </Button>
            </div>
          </Form>
          <br />
            <Link
              to={`/forgot_password`}
            >
              Forgot your password?
            </Link>
            </Card.Body>
          </Card>
      </div>
    );
  }
}

export default Login;

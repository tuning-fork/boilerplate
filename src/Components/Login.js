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
        <Card border="light" style={{backgroundColor: "#09191b", margin: "1rem", padding: "1rem"}}>
          <Card.Body style={{backgroundColor: "#09191b", color: "#23cb87", fontWeight: "bolder", display: "inline", padding: "1rem"}}>
          <Card.Text style={{color: "#23cb87", fontWeight: "bolder", display: "inline", marginBottom: "1rem"}}>Log In:</Card.Text>
          <Form onSubmit={this.handleSubmit} style={{marginTop: "2rem"}}>
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
            <div style={{flex: "auto"}}>
              <Button variant="outline-success" type="submit" style={{textColor: "#23cb87", fontWeight: "bolder", display: "inline", margin: "1rem"}}>
                Login
              </Button>
              <Button variant="outline-success" type="submit" href={`/forgot_password`} style={{textColor: "#23cb87", fontWeight: "bolder", display: "inline", margin: "1rem"}}>
                Forgot Password?
              </Button>
            </div>
          </Form>
              
            {/* <Link variant="light"
              to={`/forgot_password`}
            >
              Forgot your password?
            </Link> */}
            </Card.Body>
          </Card>
      </div>
    );
  }
}

export default Login;

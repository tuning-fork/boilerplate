import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errorMessage: '',
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

    axios
      .post(
        '/api/sessions',
        {
          email: email,
          password: password,
        }
        // { withCredentials: true }
      )

      .then((response) => {
        if (response.data.jwt) {
          localStorage.setItem('token', response.data.jwt);
          localStorage.setItem('user_id', response.data.user_id);
          this.props.history.push('/dashboard');
        }
      })
      .catch((error) => {
        // this.setState({
        //  errorMessage: error.response.data.message,
        // });
        console.log(this.state.errorMessage);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </div>
            <div>
              <span style={{ color: 'red' }}>{this.state.errorMessage}</span>
            </div>
            <div className="text-center">
              <button type="submit" className="btn-lg">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;

import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      active: true,
      errors: [],
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
    const {
      first_name,
      last_name,
      email,
      active,
      password,
      password_confirmation,
    } = this.state;

    axios
      .post(
        '/api/users',
        {
          first_name: first_name,
          last_name: last_name,
          email: email,
          active: true,
          password: password,
          password_confirmation: password_confirmation,
        }
      )

      .then((response) => {
        if (response.data.message === 'User created successfully') {
          this.props.history.push('/login');
        }
      })
      .catch((error) => {
        this.setState({
          errors: error.response.data.errors,
        });
        console.log(this.state.errors);
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
                type="text"
                name="first_name"
                placeholder="First Name"
                value={this.state.first_name}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={this.state.last_name}
                onChange={this.handleChange}
                required
              />
            </div>
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
            <div className="form-group">
              <input
                type="password"
                name="password_confirmation"
                placeholder="Password Confirmation"
                value={this.state.password_confirmation}
                onChange={this.handleChange}
                required
              />
            </div>
            <div>
              {this.state.errors.map((error, index) => {
                return (
                  <span key={index} style={{ color: 'red' }}>
                    {error},{' '}
                  </span>
                );
              })}
            </div>
            <div className="text-center">
              <button className="btn-lg" type="submit">
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;

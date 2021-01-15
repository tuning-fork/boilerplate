import React, { Component } from 'react';
// import { resetPassword } from '../helpers/passwords';
// import { connect } from 'react-redux';
import axios from 'axios';

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
                alert(response.alert)
            }
        })
      .catch((error) => console.log(error));
  }

  render() {
    return (
        <div>
            <p>Reset Password:</p>
            <form onSubmit={this.handleSubmit}>
            <label for="token">Token:</label>
            <input required id="token" onChange={this.handleChange} name="token" placeholder="token" type="token" value={this.state.token}/>
            <p>The code that was emailed to you. This is case-sensitive.</p>
            <label for="email">Email:</label>
            <input required id="email" onChange={this.handleChange} name="email" placeholder="email" type="email" value={this.state.email}/>
            <label for="password">New password:</label>
            <input required id="password" onChange={this.handleChange} name="password" placeholder="password" type="password" value={this.state.password}/>
            <p>Set your new password here.</p>
            <label for="password_confirmation">Confirm new password:</label>
            <input required id="password_confirmation" onChange={this.handleChange} name="password_confirmation" placeholder="password confirmation" type="password" value={this.state.password_confirmation}/>
            <button type="secondary">Reset Password</button>
            </form>
        </div>
    );
  }
}

export default ResetPassword;
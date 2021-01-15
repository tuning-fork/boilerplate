import React, { Component } from 'react';
import { forgotPassword } from '../helpers/passwords';

export default class ForgotPassword extends Component {
  state = {
    email: ""
  }

    const baseURL = "http://localhost:3000/api/v1"

    forgotPassword = (email) => {
        axios
            .post('/api/forgot_password', 
            {headers: { Authorization: `Bearer ${localStorage.token}` }})
            .then((response) => {
                alert(response.alert)
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
    forgotPassword(this.state.email)
    this.setState({
      email: ""
    })
    this.props.history.push('/')
  }

  render() {
    return (
    <div>
        <p>Request password reset:</p>
        <form onSubmit={this.handleSubmit}>
            <input required id="forgotpasswordemail" onChange={this.handleChange} name="email" placeholder="email" type="email" value={this.state.email}/>
            <button >Submit</button>
        </form>
    </div>
    );
  }
}
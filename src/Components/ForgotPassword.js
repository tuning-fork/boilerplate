import React, { Component } from 'react';
import axios from 'axios';

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
          console.log(response.data.message)
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
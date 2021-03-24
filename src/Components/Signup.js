import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function Signup() {
  // constructor(props) {
  //   super(props);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [active, setActive] = useState(true);
  const [errors, setErrors] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = (event) => {
    const {
      first_name,
      last_name,
      email,
      // active,
      password,
      password_confirmation,
    } = this.state;

    axios
      .post(
        "/api/users",
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          active: true,
          password: password,
          password_confirmation: passwordConfirmation,
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )

      .then((response) => {
        if (response.data.message === "User created successfully") {
          this.props.history.push("/login");
        }
      })
      .catch((error) => {
        setErrors(error.response.data.errors);
        console.log(errors);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <Card className="basic">
          <Card.Header>Sign Up As A New User!</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Password Confirmation"
                  value={passwordConfirmation}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <div>
                {errors.map((error, index) => {
                  return (
                    <span key={index} style={{ color: "red" }}>
                      {error},{" "}
                    </span>
                  );
                })}
              </div>
              <div>
                <Button className="basic" type="submit">
                  Signup
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }

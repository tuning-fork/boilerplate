import React from "react";
import Container from "../design/Container/Container";
import LoginForm from "./LoginForm";
import NavbarLoginForm from "./NavbarLoginForm";
import "./Login.css";

export default function Login(props) {
  return (
    <>
      {props.formType === "standard" ? (
        <div className="login">
          <Container as="section" centered>
            <LoginForm toggleModalContents={props.toggleModalContents} />
          </Container>
        </div>
      ) : (
        <NavbarLoginForm toggleModalContents={props.toggleModalContents} />
      )}
    </>
  );
}

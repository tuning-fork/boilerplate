import React, { useState } from "react";
import Button from "../../Components/design/Button/Button";
import TextBox from "../../Components/design/TextBox/TextBox";
import "./AcceptInvitationForm.css";

export default function AcceptInvitationForm(props) {
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== passwordConfirmation) {
      alert("Passwords don't match");
    } else {
      props.onSubmit({ firstName, lastName, password });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="accept-invitation-form">
      <TextBox
        type="firstName"
        name="firstName"
        labelText="First Name"
        placeholder="First Name"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
        required
      />
      <TextBox
        type="lastName"
        name="lastName"
        labelText="Last Name"
        placeholder="Last Name"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
        required
      />
      <TextBox
        type="password"
        name="password"
        labelText="Password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <TextBox
        type="password"
        name="passwordConfirmation"
        labelText="Password Confirmation"
        placeholder="Password Confirmation"
        value={passwordConfirmation}
        onChange={(event) => setPasswordConfirmation(event.target.value)}
        required
      />
      <div className="accept-invitation-form__actions">
        <Button type="submit" className="accept-invitation-form__submit-button">
          Submit
        </Button>
      </div>
    </form>
  );
}

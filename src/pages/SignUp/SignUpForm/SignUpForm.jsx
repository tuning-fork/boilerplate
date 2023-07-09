import React, { useState } from "react";
import { Button } from "@mantine/core";
import TextBox from "../../../Components/design/TextBox/TextBox";
import "./SignUpForm.css";

export default function SignUpForm(props) {
  const [newUserFields, setNewUserFields] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(newUserFields);
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <TextBox
        type="text"
        name="first_name"
        labelText="First Name"
        value={newUserFields.first_name}
        onChange={(event) =>
          setNewUserFields({
            ...newUserFields,
            first_name: event.target.value,
          })
        }
        required
      />
      <TextBox
        type="text"
        name="last_name"
        labelText="Last Name"
        value={newUserFields.last_name}
        onChange={(event) =>
          setNewUserFields({
            ...newUserFields,
            last_name: event.target.value,
          })
        }
        required
      />
      <TextBox
        type="email"
        name="email"
        labelText="Email"
        value={newUserFields.email}
        onChange={(event) =>
          setNewUserFields({
            ...newUserFields,
            email: event.target.value,
          })
        }
        required
      />
      <TextBox
        type="password"
        name="password"
        labelText="Password"
        value={newUserFields.password}
        onChange={(event) =>
          setNewUserFields({ ...newUserFields, password: event.target.value })
        }
        required
      />
      <TextBox
        type="password"
        name="password"
        labelText="Confirm Password"
        value={newUserFields.password_confirmation}
        onChange={(event) =>
          setNewUserFields({
            ...newUserFields,
            password_confirmation: event.target.value,
          })
        }
        required
      />
      <div className="signup-form__actions">
        <Button
          type="submit"
          size="md"
        >
          Create Account
        </Button>
      </div>
    </form>
  );
}

import { useState } from "react";
import Button from "../design/Button/Button";
import TextBox from "../design/TextBox/TextBox";
import "./SignUpForm.css";

export default function SignUpForm(props) {
  const [newUserFields, setNewUserFields] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    setNewUserFields({ ...newUserFields, active: true });
    props.onSubmit(newUserFields);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="signup-form">
        <TextBox
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
          labelText="email"
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
          labelText="password"
          value={newUserFields.password}
          onChange={(event) =>
            setNewUserFields({ ...newUserFields, password: event.target.value })
          }
          required
        />
        <TextBox
          labelText="password_confirmation"
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
          <p>Already have an account? Sign In</p>
          <Button variant="text" onClick={props.onCancel}>
            Cancel
          </Button>
          <Button type="submit">Create Account</Button>
        </div>
      </form>
    </>
  );
}

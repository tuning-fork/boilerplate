import { useState } from "react";
import Button from "../design/Button/Button";
import Dropdown from "../design/Dropdown/Dropdown";
import TextBox from "../design/TextBox/TextBox";
import "./GrantForm.css";

export default function SignUpForm(props) {
  const [SignUpFields, setSignUpFields] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(SignUpFields);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="signup-form">
        <TextBox
          labelText="Title"
          value={signUpFields.title}
          onChange={(event) =>
            setSignUpFields({ ...signUpFields, title: event.target.value })
          }
          required
        />
        <TextBox
          labelText="RFP URL"
          value={signUpFields.rfpUrl}
          onChange={(event) =>
            setSignUpFields({ ...signUpFields, rfpUrl: event.target.value })
          }
          type="url"
          required
        />
        <TextBox
          labelText="Deadline"
          type="datetime-local"
          value={formatDateForInput(signUpFields.deadline)}
          onChange={(event) =>
            setSignUpFields({
              ...signUpFields,
              deadline: parseDateFromInput(event.target.value),
            })
          }
          required
        />
        <TextBox
          labelText="Purpose"
          value={signUpFields.purpose}
          onChange={(event) =>
            setsignUpFields({ ...signUpFields, purpose: event.target.value })
          }
          required
        />
        <div className="grant-form__actions">
          <Button variant="text" onClick={props.onCancel}>
            Cancel
          </Button>
          <Button type="submit">Sign Up</Button>
        </div>
      </form>
    </>
  );
}

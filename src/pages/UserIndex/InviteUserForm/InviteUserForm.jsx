import React, { useState } from "react";
import Button from "../../../Components/design/Button/Button";
import TextBox from "../../../Components/design/TextBox/TextBox";
import "./InviteUserForm.css";

export default function InviteUserForm(props) {
  const [invitationFields, setInvitationFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(invitationFields);
  };

  return (
    <form onSubmit={handleSubmit} className="invite-user-form">
      <TextBox
        labelText="First Name"
        value={invitationFields.firstName}
        onChange={(event) =>
          setInvitationFields({
            ...invitationFields,
            firstName: event.target.value,
          })
        }
        required
      />
      <TextBox
        labelText="Last Name"
        value={invitationFields.lastName}
        onChange={(event) =>
          setInvitationFields({
            ...invitationFields,
            lastName: event.target.value,
          })
        }
        required
      />
      <TextBox
        labelText="Email"
        value={invitationFields.email}
        onChange={(event) =>
          setInvitationFields({
            ...invitationFields,
            email: event.target.value,
          })
        }
        required
      />
      <div className="invite-user-form__actions">
        <Button variant="text" onClick={props.onCancel}>
          Cancel
        </Button>
        <Button type="submit">Invite</Button>
      </div>
    </form>
  );
}

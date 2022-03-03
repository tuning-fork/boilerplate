import { useState } from "react";
import Button from "../design/Button/Button";
import TextBox from "../design/TextBox/TextBox";
import "./OrganizationForm.css";

export default function OrganizationForm(props) {
  const [organizationFields, setOrganizationFields] = useState({
    ...props.organization,
    name: props.organization?.name || "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(organizationFields);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="organization-form">
        <TextBox
          labelText="Name"
          value={organizationFields.name}
          onChange={(event) =>
            setOrganizationFields({
              ...organizationFields,
              name: event.target.value,
            })
          }
          required
        />
        <div className="organization-form__actions">
          <Button variant="text" onClick={props.onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </>
  );
}

import React, { useState } from "react";
import TextBox from "..//design/TextBox/TextBox";
import { Button } from "@mantine/core";
import "./OrganizationForm.css";

export default function OrganizationForm(props) {
  const { onSubmit, onCancel } = props;
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    onSubmit({ name });
  };

  return (
    <form className="organization-form" onSubmit={handleSubmit}>
      <TextBox
        labelText="Organization Name"
        type="text"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />
      <div className="organization-form__actions">
        <Button variant="subtle" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Add</Button>
      </div>
    </form>
  );
}

import React, { useState } from "react";
import Button from "../design/Button/Button";

export default function OrganizationEditForm(props) {
  const { onSubmit, onCancel } = props;
  const [newName, setNewName] = useState(props.name);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      newName,
    });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>Edit Organization</div>
        <label>Organization Name</label>
        <input
          type="text"
          value={newName}
          name="newName"
          placeholder={newName}
          onChange={(event) => setNewName(event.target.value)}
          required
        />
      </div>
      <Button
        style={{
          fontWeight: "bolder",
        }}
        onClick={handleCancel}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        style={{
          fontWeight: "bolder",
        }}
        onClick={handleSubmit}
      >
        Save Changes
      </Button>
    </form>
  );
}

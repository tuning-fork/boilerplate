import React, { useState } from "react";
import Button from "../design/Button/Button";

export default function OrganizationsNew(props) {
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await props.onSubmit({
      name: name,
    });
    setName("");
  };

  return (
    <div>
      <header>
        <h3>Add Organization</h3>
      </header>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Organization Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <Button onClick={props.onCancel}>Cancel</Button>
          <Button type="submit">Add New Organization</Button>
        </form>
      </div>
    </div>
  );
}

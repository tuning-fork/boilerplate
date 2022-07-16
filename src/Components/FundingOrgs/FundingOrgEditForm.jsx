import React, { useState } from "react";
import Button from "../design/Button/Button";

export default function FundingOrgsEditForm(props) {
  const { onSubmit, onCancel } = props;
  const [newName, setNewName] = useState(props.fundingOrg.name);
  const [newWebsite, setNewWebsite] = useState(props.fundingOrg.website);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(
      {
        newName,
        newWebsite,
      },
      props.fundingOrg.id
    );
  };

  const handleCancel = (event) => {
    event.preventDefault();
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name
          <input
            type="text"
            value={newName}
            name="newName"
            placeholder={newName}
            onChange={(event) => setNewName(event.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Website
          <input
            type="text"
            value={newWebsite}
            name="newWebsite"
            placeholder={newWebsite}
            onChange={(event) => setNewWebsite(event.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <Button
          type="submit"
          style={{
            maxWidth: "50%",
            align: "center",
            backgroundColor: "#23cb87",
            color: "#09191b",
            fontWeight: "bolder",
          }}
          onClick={handleSubmit}
        >
          Save Changes
        </Button>
        <Button
          style={{
            maxWidth: "50%",
            align: "center",
            backgroundColor: "#23cb87",
            color: "#09191b",
            fontWeight: "bolder",
          }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

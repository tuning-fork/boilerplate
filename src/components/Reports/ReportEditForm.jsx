import React, { useState } from "react";
import Button from "../design/Button/Button";

export default function ReportEditForm(props) {
  const { onSubmit, onCancel } = props;
  const [newTitle, setNewTitle] = useState(props.title);
  const [newDeadline, setNewDeadline] = useState(props.deadline);
  const [newSubmitted, setNewSubmitted] = useState(props.submitted);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      newTitle,
      newDeadline,
      newSubmitted,
    });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={newTitle}
          name="newTitle"
          onChange={(event) => setNewTitle(event.target.value)}
          required
        />
      </div>
      <div>
        <label>Deadline</label>
        <input
          type="datetime"
          value={newDeadline}
          name="newDeadline"
          onChange={(event) => setNewDeadline(event.target.value)}
          required
        />
      </div>
      <div>
        <label>Submitted</label>
        <input
          type="checkbox"
          name="newSubmitted"
          checked={newSubmitted}
          onChange={(event) => setNewSubmitted(event.target.checked)}
        />
      </div>
      <div className="text-center">
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
      </div>
    </form>
  );
}

import React, { useState } from "react";
import Button from "../design/Button/Button";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import { createGrantReport } from "../../services/Organizations/Grants/GrantReportsService";

export default function ReportsNew(props) {
  const [deadline, setDeadline] = useState("");
  const [submitted, _setSubmitted] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [title, setTitle] = useState(`Report for ${props.grant_title}`);

  const { organizationClient } = useCurrentOrganization();

  const clearForm = () => {
    setDeadline("");
  };

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReport = {
      grantId: props.grantId,
      title: title,
      deadline: deadline,
      submitted: submitted,
    };
    createGrantReport(organizationClient, props.grantId, newReport)
      .then((report) => {
        if (report) {
          toggleHidden();
          props.updateReports(report);
          clearForm();
        }
      })
      .catch((error) => {
        console.error("report creation error", error);
      });
  };

  return (
    <div>
      {isHidden ? (
        <Button onClick={toggleHidden}>Add Report</Button>
      ) : (
        <Button onClick={toggleHidden}>Close</Button>
      )}
      <br />
      <br />
      {!isHidden ? (
        <div>
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
              </div>
              <div>
                <label>Deadline</label>
                <input
                  type="datetime-local"
                  name="deadline"
                  value={deadline}
                  onChange={(event) => setDeadline(event.target.value)}
                  required
                />
              </div>
              <div className="text-center">
                <Button type="submit">Submit New Report</Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

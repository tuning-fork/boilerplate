import { React, useState } from "react";
import ReviewerIcon from "../Helpers/ReviewerIcon";
import "./ReviewerListItem.css";
import Checkbox from "../design/Checkbox/Checkbox";

export default function ReviewerListItem(props) {
  const { reviewer } = props;
  const [checked, setChecked] = useState(false);

  return (
    <li className="reviewer-list-item">
      <ReviewerIcon
        firstName={reviewer.firstName}
        lastName={reviewer.lastName}
      />
      {reviewer.firstName} {reviewer.lastName}
      <div className="reviewer-list-checkbox">
        <Checkbox
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
        />
      </div>
    </li>
  );
}

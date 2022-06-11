import { React } from "react";
import ReviewerIcon from "../Helpers/ReviewerIcon";
import Checkbox from "../design/Checkbox/Checkbox";
import "./RequestedReviewerListItem.css";

export default function RequestedReviewerListItem(props) {
  const { reviewer, onChecked, onUnchecked } = props;

  const handleChecked = (checked) => {
    if (checked) {
      onChecked(reviewer);
    } else {
      onUnchecked(reviewer);
    }
  };

  return (
    <li className="reviewer-list-item">
      <ReviewerIcon
        firstName={reviewer.firstName}
        lastName={reviewer.lastName}
      />
      {reviewer.firstName} {reviewer.lastName}
      <div className="reviewer-list-checkbox">
        <Checkbox onChange={(event) => handleChecked(event.target.checked)} />
      </div>
    </li>
  );
}

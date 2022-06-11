import { React } from "react";
import ReviewerIcon from "../Helpers/ReviewerIcon";
import Button from "../design/Button/Button";
import { MdCancel } from "react-icons/md";
import "./RequestedReviewerListItem.css";

export default function RequestedReviewerListItem(props) {
  const { reviewer, onClickRemove } = props;

  return (
    <li className="reviewer-list-item">
      <ReviewerIcon
        firstName={reviewer.firstName}
        lastName={reviewer.lastName}
      />
      {reviewer.firstName} {reviewer.lastName}
      {/* <div className="reviewer-list-checkbox">
        <Checkbox onChange={(event) => handleChecked(event.target.checked)} />
      </div> */}
      <div className="reviewer-list-checkbox">
        <Button variant="none" onClick={() => onClickRemove(reviewer)}>
          <MdCancel />
        </Button>
      </div>
    </li>
  );
}

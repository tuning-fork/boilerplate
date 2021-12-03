import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { MdAlarm, MdAccessTime } from "react-icons/md";
import "./DeadlineClock.css";

export default function DeadlineClock(props) {
  const { deadline, days } = props;

  return (
    <div>
      {deadline && days <= 7 && days >= 3 ? (
        <MdAccessTime className="deadline-clock__urgent" />
      ) : (
        <div></div>
      )}
      {deadline && days <= 3 ? (
        <MdAlarm className="deadline-clock__emergency" />
      ) : (
        <div></div>
      )}
    </div>
  );
}

DeadlineClock.propTypes = {
  deadline: PropTypes.bool,
  days: PropTypes.number,
};

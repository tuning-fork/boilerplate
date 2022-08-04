import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { MdAlarm, MdAccessTime } from "react-icons/md";
import "./DeadlineClock.css";
import { differenceInCalendarDays } from "date-fns";

export default function DeadlineClock(props) {
  const { className, deadline } = props;
  const days = differenceInCalendarDays(deadline, new Date());

  if (days >= 3 && days <= 7) {
    return (
      <MdAccessTime
        className={clsx(className, "deadline-clock", "deadline-clock--urgent")}
      />
    );
  } else if (days <= 3) {
    return (
      <MdAlarm
        className={clsx(
          className,
          "deadline-clock",
          "deadline-clock--emergency"
        )}
      />
    );
  } else {
    return null;
  }
}

DeadlineClock.propTypes = {
  className: PropTypes.string,
  deadline: PropTypes.instanceOf(Date).isRequired,
};

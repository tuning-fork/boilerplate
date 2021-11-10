import { differenceInCalendarDays } from "date-fns";

const daysLeft = (dateString) => {
  return differenceInCalendarDays(new Date(dateString), new Date());
};

export default daysLeft;

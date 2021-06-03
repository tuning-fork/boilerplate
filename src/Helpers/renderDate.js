import { format as formatDate, parseISO } from "date-fns";

const renderDate = (dateString) => {
  formatDate(parseISO(dateString), "PP");
};

export default renderDate;

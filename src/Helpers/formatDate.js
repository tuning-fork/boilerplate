import { format, parseISO } from "date-fns";

const formatDate = (dateString) => {
  if (dateString instanceof Date) {
    return format(dateString, "PPP");
  }
  return format(parseISO(dateString), "PP");
};

export default formatDate;

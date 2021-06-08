import { format } from "date-fns";

export default function formatDateForInput(date) {
  return format(date, "yyyy-MM-dd'T'HH:mm");
}

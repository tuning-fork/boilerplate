import { parse } from "date-fns";

export default function parseDateFromInput(dateString) {
  return parse(dateString, "yyyy-MM-dd'T'HH:mm", new Date());
}

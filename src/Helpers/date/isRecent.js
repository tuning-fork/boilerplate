import { differenceInDays } from "date-fns";

const RECENT_DAYS = 6;

/**
 * Includes dates starting from today to 6 days in the past
 * @param {Date} date Date to compare
 * @returns {boolean} Whether the provided date is recent
 */
export default function isRecent(date) {
  const diff = differenceInDays(new Date(), date);
  return diff >= 0 && diff <= RECENT_DAYS;
}

import { differenceInDays } from "date-fns";

const SOON_DAYS = 6;

/**
 * Includes dates starting from today to 6 days into the future
 * @param {Date} date Date to compare
 * @returns {boolean} Whether the provided date is soon
 */
export default function isSoon(date) {
  const diff = differenceInDays(new Date(), date);
  return diff <= 0 && diff >= -SOON_DAYS;
}

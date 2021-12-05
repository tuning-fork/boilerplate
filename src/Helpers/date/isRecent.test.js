import { addDays, subDays } from "date-fns";
import isRecent from "./isRecent";

describe("isRecent", () => {
  it("returns true when given date is today", () => {
    expect(isRecent(new Date())).toBe(true);
  });

  it("returns true when given date is within 6 days of the past", () => {
    expect(isRecent(subDays(new Date(), 1))).toBe(true);
    expect(isRecent(subDays(new Date(), 2))).toBe(true);
    expect(isRecent(subDays(new Date(), 3))).toBe(true);
    expect(isRecent(subDays(new Date(), 4))).toBe(true);
    expect(isRecent(subDays(new Date(), 5))).toBe(true);
    expect(isRecent(subDays(new Date(), 6))).toBe(true);
  });

  it("returns false when given date is more than 6 days in the past", () => {
    expect(isRecent(subDays(new Date(), 7))).toBe(false);
    expect(isRecent(subDays(new Date(), 10))).toBe(false);
    expect(isRecent(subDays(new Date(), 30))).toBe(false);
  });

  it("returns false when given date is in the future", () => {
    expect(isRecent(addDays(new Date(), 1))).toBe(false);
    expect(isRecent(addDays(new Date(), 2))).toBe(false);
    expect(isRecent(addDays(new Date(), 10))).toBe(false);
    expect(isRecent(addDays(new Date(), 30))).toBe(false);
  });
});

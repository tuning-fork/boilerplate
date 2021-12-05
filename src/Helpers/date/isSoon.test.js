import { addDays, subDays } from "date-fns";
import isSoon from "./isSoon";

describe("isSoon", () => {
  it("returns true when given date is today", () => {
    expect(isSoon(new Date())).toBe(true);
  });

  it("returns true when given date is within 6 days of the future", () => {
    expect(isSoon(addDays(new Date(), 1))).toBe(true);
    expect(isSoon(addDays(new Date(), 2))).toBe(true);
    expect(isSoon(addDays(new Date(), 3))).toBe(true);
    expect(isSoon(addDays(new Date(), 4))).toBe(true);
    expect(isSoon(addDays(new Date(), 5))).toBe(true);
    expect(isSoon(addDays(new Date(), 6))).toBe(true);
  });

  it("returns false when given date is more than 6 days in the future", () => {
    expect(isSoon(addDays(new Date(), 7))).toBe(false);
    expect(isSoon(addDays(new Date(), 10))).toBe(false);
    expect(isSoon(addDays(new Date(), 30))).toBe(false);
  });

  it("returns false when given date is in the past", () => {
    expect(isSoon(subDays(new Date(), 1))).toBe(false);
    expect(isSoon(subDays(new Date(), 2))).toBe(false);
    expect(isSoon(subDays(new Date(), 10))).toBe(false);
    expect(isSoon(subDays(new Date(), 30))).toBe(false);
  });
});

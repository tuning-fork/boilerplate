import { vi } from "vitest";
import { mapInvitation } from "./InvitationsService";

describe("mapInvitation", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2022-04-01"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("hasExpired", () => {
    describe("when expires_at is today", () => {
      it("returns true", () => {
        const mappedInvitation = mapInvitation({
          expires_at: "2022-04-01",
        });
        expect(mappedInvitation.hasExpired()).toBe(true);
      });
    });

    describe("when expires_at is in the future", () => {
      const mappedInvitation = mapInvitation({
        expires_at: "2022-04-10",
      });

      it("returns false", () => {
        expect(mappedInvitation.hasExpired()).toBe(false);
      });
    });

    describe("when expires_at is in the past", () => {
      const mappedInvitation = mapInvitation({
        expires_at: "2022-03-30",
      });

      it("returns false", () => {
        expect(mappedInvitation.hasExpired()).toBe(true);
      });
    });
  });
});

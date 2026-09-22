import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  calculateCycle,
  getCycleDayForDate,
  parseLocalDate,
  formatYYYYMMDD,
} from "./cycleCalculations";

describe("cycleCalculations", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("parseLocalDate & formatYYYYMMDD", () => {
    it("should correctly parse YYYY-MM-DD into local midnight Date", () => {
      const date = parseLocalDate("2025-03-15");
      expect(date.getFullYear()).toBe(2025);
      expect(date.getMonth()).toBe(2); // March is month 2 (0-indexed)
      expect(date.getDate()).toBe(15);
      expect(date.getHours()).toBe(0);
    });

    it("should correctly format local Date to YYYY-MM-DD", () => {
      const date = new Date(2025, 2, 15);
      expect(formatYYYYMMDD(date)).toBe("2025-03-15");
    });
  });

  describe("calculateCycle & getCycleDayForDate", () => {
    it("should calculate cycleDay = 1 when today is the start date", () => {
      // Set local system time to 2025-03-15 at 14:30:00 local time
      vi.setSystemTime(new Date(2025, 2, 15, 14, 30, 0));

      const results = calculateCycle({
        startDate: "2025-03-15",
        cycleLength: 28,
        periodLength: 5,
        lutealPhaseLength: 14,
      });

      expect(results.cycleDay).toBe(1);
      expect(results.currentPhase).toBe("menstrual");
      expect(results.ovulationDate).toBe("2025-03-29");
      expect(results.fertileWindow.start).toBe("2025-03-24");
      expect(results.fertileWindow.end).toBe("2025-03-30");
      expect(results.nextPeriod).toBe("2025-04-12");
    });

    it("should calculate cycleDay correctly regardless of test execution time during the day", () => {
      // Test at early morning (00:05)
      vi.setSystemTime(new Date(2025, 2, 20, 0, 5, 0));
      let results = calculateCycle({
        startDate: "2025-03-15",
        cycleLength: 28,
        periodLength: 5,
        lutealPhaseLength: 14,
      });
      expect(results.cycleDay).toBe(6);

      // Test at late night (23:55)
      vi.setSystemTime(new Date(2025, 2, 20, 23, 55, 0));
      results = calculateCycle({
        startDate: "2025-03-15",
        cycleLength: 28,
        periodLength: 5,
        lutealPhaseLength: 14,
      });
      expect(results.cycleDay).toBe(6);
    });

    it("should calculate getCycleDayForDate accurately for local dates", () => {
      const startDate = parseLocalDate("2025-03-15");
      const targetDate = parseLocalDate("2025-03-20");

      const dayNum = getCycleDayForDate(targetDate, startDate, 28);
      expect(dayNum).toBe(6);
    });

    it("should handle cyclic wrap-around in getCycleDayForDate", () => {
      const startDate = parseLocalDate("2025-03-15");
      // 28 days later = 2025-04-12 => Cycle Day 1 of next cycle
      const nextCycleStart = parseLocalDate("2025-04-12");

      const dayNum = getCycleDayForDate(nextCycleStart, startDate, 28);
      expect(dayNum).toBe(1);
    });
  });
});

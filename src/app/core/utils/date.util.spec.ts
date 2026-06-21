import { addMonths, daysOverdue, isPast, parseIsoDate, toIsoDate, today } from './date.util';

describe('date.util', () => {
  describe('parseIsoDate', () => {
    it('should parse a YYYY-MM-DD string into a local date', () => {
      const date = parseIsoDate('2026-06-21');
      expect(date.getFullYear()).toBe(2026);
      expect(date.getMonth()).toBe(5);
      expect(date.getDate()).toBe(21);
    });

    it('should default missing month and day to the first', () => {
      const date = parseIsoDate('2026');
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(1);
    });
  });

  describe('toIsoDate', () => {
    it('should format a date as YYYY-MM-DD with zero padding', () => {
      expect(toIsoDate(new Date(2026, 0, 5))).toBe('2026-01-05');
    });

    it('should round-trip with parseIsoDate', () => {
      expect(toIsoDate(parseIsoDate('2026-12-31'))).toBe('2026-12-31');
    });
  });

  describe('with a fixed system date (2026-06-21)', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2026, 5, 21, 10, 30));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('today() should return midnight of the current day', () => {
      const t = today();
      expect(toIsoDate(t)).toBe('2026-06-21');
      expect(t.getHours()).toBe(0);
    });

    it('isPast() should be true for past dates and false for today/future', () => {
      expect(isPast('2026-06-20')).toBe(true);
      expect(isPast('2026-06-21')).toBe(false);
      expect(isPast('2026-06-22')).toBe(false);
    });

    it('daysOverdue() should count whole days for past dates and clamp to 0', () => {
      expect(daysOverdue('2026-06-18')).toBe(3);
      expect(daysOverdue('2026-06-21')).toBe(0);
      expect(daysOverdue('2026-07-01')).toBe(0);
    });
  });

  describe('addMonths', () => {
    it('should add months', () => {
      expect(addMonths('2026-01-15', 2)).toBe('2026-03-15');
    });

    it('should roll over the year', () => {
      expect(addMonths('2026-11-10', 3)).toBe('2027-02-10');
    });
  });
});

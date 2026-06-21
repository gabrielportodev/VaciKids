import { summarizeRecords } from './summary.util';
import { VaccinationRecord } from 'src/app/shared/models/vaccination-record.model';

function record(status: VaccinationRecord['status']): VaccinationRecord {
  return {
    id: `r-${Math.random()}`,
    childId: 'c1',
    vaccineId: 'bcg',
    dose: 1,
    scheduledDate: '2026-01-01',
    status,
  };
}

describe('summary.util', () => {
  describe('summarizeRecords', () => {
    it('should return zeroed totals for an empty list', () => {
      expect(summarizeRecords([])).toEqual({
        applied: 0,
        pending: 0,
        overdue: 0,
        total: 0,
        appliedPercent: 0,
        overduePercent: 0,
      });
    });

    it('should count each status and derive pending as the remainder', () => {
      const summary = summarizeRecords([
        record('applied'),
        record('applied'),
        record('overdue'),
        record('pending'),
      ]);

      expect(summary.total).toBe(4);
      expect(summary.applied).toBe(2);
      expect(summary.overdue).toBe(1);
      expect(summary.pending).toBe(1);
    });

    it('should compute rounded percentages over the total', () => {
      const summary = summarizeRecords([record('applied'), record('overdue'), record('pending')]);

      expect(summary.appliedPercent).toBe(33);
      expect(summary.overduePercent).toBe(33);
    });
  });
});

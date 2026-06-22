import { aggregateStatus, resolveStatus, statusVisual } from './status.util';
import { VaccinationStatus } from 'src/app/shared/models/vaccination-status.model';

describe('status.util', () => {
  describe('resolveStatus (fixed system date 2026-06-21)', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2026, 5, 21, 10, 30));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should be "applied" when there is an application date', () => {
      expect(resolveStatus({ applicationDate: '2026-05-01', scheduledDate: '2026-04-01' })).toBe(
        'applied',
      );
    });

    it('should be "overdue" when not applied and the scheduled date has passed', () => {
      expect(resolveStatus({ scheduledDate: '2026-06-10' })).toBe('overdue');
    });

    it('should be "pending" when not applied and the scheduled date is in the future', () => {
      expect(resolveStatus({ scheduledDate: '2026-07-01' })).toBe('pending');
    });
  });

  describe('statusVisual', () => {
    const labels: Record<VaccinationStatus, string> = {
      applied: 'Em dia',
      pending: 'Próxima',
      overdue: 'Atrasada',
    };

    for (const status of Object.keys(labels) as VaccinationStatus[]) {
      it(`should return the visual config for "${status}"`, () => {
        const visual = statusVisual(status);
        expect(visual.label).toBe(labels[status]);
        expect(visual.icon).toBeTruthy();
        expect(visual.iconColor).toBeTruthy();
        expect(visual.badgeClasses).toBeTruthy();
        expect(visual.borderClass).toBeTruthy();
      });
    }
  });

  describe('aggregateStatus', () => {
    it('should be "pending" for an empty list', () => {
      expect(aggregateStatus([])).toBe('pending');
    });

    it('should prioritize "overdue" over any other status', () => {
      expect(
        aggregateStatus([{ status: 'applied' }, { status: 'overdue' }, { status: 'pending' }]),
      ).toBe('overdue');
    });

    it('should be "pending" when none overdue but some pending', () => {
      expect(aggregateStatus([{ status: 'applied' }, { status: 'pending' }])).toBe('pending');
    });

    it('should be "applied" only when every record is applied', () => {
      expect(aggregateStatus([{ status: 'applied' }, { status: 'applied' }])).toBe('applied');
    });
  });
});

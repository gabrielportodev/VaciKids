import { ChildSummary } from 'src/app/shared/models/child-summary.model';
import { VaccinationRecord } from 'src/app/shared/models/vaccination-record.model';

export function summarizeRecords(records: VaccinationRecord[]): ChildSummary {
  const total = records.length;
  const applied = records.filter((record) => record.status === 'applied').length;
  const overdue = records.filter((record) => record.status === 'overdue').length;
  const pending = total - applied - overdue;
  return {
    applied,
    pending,
    overdue,
    total,
    appliedPercent: total ? Math.round((applied / total) * 100) : 0,
    overduePercent: total ? Math.round((overdue / total) * 100) : 0,
  };
}

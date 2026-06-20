import { Injectable, signal } from '@angular/core';
import { VaccinationRecord } from 'src/app/shared/models/vaccination-record.model';
import { VaccinationStatus } from 'src/app/shared/models/vaccination-status.model';
import { MOCK_RECORDS } from 'src/app/shared/constants/mock-records.constant';
import { resolveStatus } from 'src/app/core/utils/status.util';
import { toIsoDate, today } from 'src/app/core/utils/date.util';

@Injectable({ providedIn: 'root' })
export class VaccinationRecordService {
  private readonly records = signal<VaccinationRecord[]>(
    MOCK_RECORDS.map((record) => this.withResolvedStatus(record)),
  );

  readonly all = this.records.asReadonly();

  byChild(childId: string): VaccinationRecord[] {
    return this.records().filter((record) => record.childId === childId);
  }

  overdueByChild(childId: string): VaccinationRecord[] {
    return this.byChild(childId).filter((record) => record.status === 'overdue');
  }

  byChildAndVaccine(childId: string, vaccineId: string): VaccinationRecord[] {
    return this.byChild(childId).filter((record) => record.vaccineId === vaccineId);
  }

  summaryByChild(childId: string): {
    applied: number;
    pending: number;
    overdue: number;
    total: number;
    appliedPercent: number;
    overduePercent: number;
  } {
    const records = this.byChild(childId);
    const total = records.length;
    const applied = records.filter((r) => r.status === 'applied').length;
    const overdue = records.filter((r) => r.status === 'overdue').length;
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

  markApplied(recordId: string, applicationDate: string = toIsoDate(today())): void {
    this.records.update((list) =>
      list.map((record) =>
        record.id === recordId ? this.withResolvedStatus({ ...record, applicationDate }) : record,
      ),
    );
  }

  registerApplication(
    recordId: string,
    data: { applicationDate: string; healthUnit?: string; batch?: string },
  ): void {
    this.records.update((list) =>
      list.map((record) =>
        record.id === recordId
          ? this.withResolvedStatus({
              ...record,
              applicationDate: data.applicationDate,
              healthUnit: data.healthUnit || record.healthUnit,
              notes: data.batch ? `Lote: ${data.batch}` : record.notes,
            })
          : record,
      ),
    );
  }

  add(record: Omit<VaccinationRecord, 'id' | 'status'>): VaccinationRecord {
    const created = this.withResolvedStatus({
      ...record,
      id: `rec-${crypto.randomUUID()}`,
      status: 'pending' as VaccinationStatus,
    });
    this.records.update((list) => [...list, created]);
    return created;
  }

  private withResolvedStatus(record: VaccinationRecord): VaccinationRecord {
    return { ...record, status: resolveStatus(record) };
  }
}

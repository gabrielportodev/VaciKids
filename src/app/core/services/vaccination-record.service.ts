import { Injectable, computed, inject } from '@angular/core';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { VaccinationRecord } from 'src/app/shared/models/vaccination-record.model';
import { ChildSummary } from 'src/app/shared/models/child-summary.model';
import { resolveStatus } from 'src/app/core/utils/status.util';
import { toIsoDate, today } from 'src/app/core/utils/date.util';
import { FIRESTORE, collectionSignal, stripUndefined } from 'src/app/core/firestore';

@Injectable({ providedIn: 'root' })
export class VaccinationRecordService {
  private readonly db = inject(FIRESTORE);
  private readonly col = collection(this.db, 'vaccination-records');

  private readonly raw = collectionSignal<VaccinationRecord>(this.col);
  readonly all = computed(() => this.raw().map((record) => this.withResolvedStatus(record)));

  readonly loading = this.raw.loading;

  byChild(childId: string): VaccinationRecord[] {
    return this.all().filter((record) => record.childId === childId);
  }

  overdueByChild(childId: string): VaccinationRecord[] {
    return this.byChild(childId).filter((record) => record.status === 'overdue');
  }

  byChildAndVaccine(childId: string, vaccineId: string): VaccinationRecord[] {
    return this.byChild(childId).filter((record) => record.vaccineId === vaccineId);
  }

  summaryByChild(childId: string): ChildSummary {
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

  async markApplied(recordId: string, applicationDate: string = toIsoDate(today())): Promise<void> {
    await updateDoc(doc(this.col, recordId), { applicationDate });
  }

  async registerApplication(
    recordId: string,
    data: { applicationDate: string; healthUnit?: string; batch?: string },
  ): Promise<void> {
    await updateDoc(
      doc(this.col, recordId),
      stripUndefined({
        applicationDate: data.applicationDate,
        healthUnit: data.healthUnit,
        notes: data.batch ? `Lote: ${data.batch}` : undefined,
      }),
    );
  }

  async add(record: Omit<VaccinationRecord, 'id' | 'status'>): Promise<VaccinationRecord> {
    const ref = await addDoc(this.col, stripUndefined(record));
    return this.withResolvedStatus({ ...record, id: ref.id } as VaccinationRecord);
  }

  private withResolvedStatus(record: VaccinationRecord): VaccinationRecord {
    return { ...record, status: resolveStatus(record) };
  }
}

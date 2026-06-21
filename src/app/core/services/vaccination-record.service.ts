import { Injectable, computed, inject } from '@angular/core';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { VaccinationRecord } from 'src/app/shared/models/vaccination-record.model';
import { ChildSummary } from 'src/app/shared/models/child-summary.model';
import { resolveStatus, summarizeRecords } from 'src/app/core/utils';
import { FIRESTORE, collectionSignal, stripUndefined } from 'src/app/core/firestore';

@Injectable({ providedIn: 'root' })
export class VaccinationRecordService {
  private readonly db = inject(FIRESTORE);
  private readonly col = collection(this.db, 'vaccination-records');

  private readonly raw = collectionSignal<VaccinationRecord>(this.col);
  readonly all = computed(() =>
    this.raw().map((record) => ({ ...record, status: resolveStatus(record) })),
  );

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
    return summarizeRecords(this.byChild(childId));
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
}

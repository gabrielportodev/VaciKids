import { Injectable, inject } from '@angular/core';
import { WriteBatch, collection, deleteDoc, doc, updateDoc, writeBatch } from 'firebase/firestore';
import { Child } from 'src/app/shared/models/child.model';
import { FIRESTORE, collectionSignal, stripUndefined } from 'src/app/core/firestore';
import { VaccineService } from 'src/app/core/services/vaccine.service';
import { VaccinationRecordService } from 'src/app/core/services/vaccination-record.service';
import { addMonths } from 'src/app/core/utils';

@Injectable({ providedIn: 'root' })
export class ChildService {
  private readonly db = inject(FIRESTORE);
  private readonly col = collection(this.db, 'children');
  private readonly recordsCol = collection(this.db, 'vaccination-records');
  private readonly vaccineService = inject(VaccineService);
  private readonly recordService = inject(VaccinationRecordService);

  readonly all = collectionSignal<Child>(this.col);

  getById(id: string): Child | undefined {
    return this.all().find((child) => child.id === id);
  }

  async create(child: Omit<Child, 'id'>): Promise<Child> {
    const childRef = doc(this.col);
    const created = { ...child, id: childRef.id };
    const batch = writeBatch(this.db);
    batch.set(childRef, stripUndefined(child));

    for (const record of this.vaccineService.recordsForChild(created.id, child.birthDate)) {
      batch.set(doc(this.recordsCol), record);
    }

    await batch.commit();
    return created;
  }

  async update(id: string, changes: Partial<Omit<Child, 'id'>>): Promise<void> {
    if (!this.changesBirthDate(id, changes)) {
      await updateDoc(doc(this.col, id), stripUndefined(changes));
      return;
    }

    const batch = writeBatch(this.db);
    batch.update(doc(this.col, id), stripUndefined(changes));
    this.rescheduleUnappliedDoses(batch, id, changes.birthDate!);
    await batch.commit();
  }

  private changesBirthDate(id: string, changes: Partial<Omit<Child, 'id'>>): boolean {
    return !!changes.birthDate && changes.birthDate !== this.getById(id)?.birthDate;
  }

  private rescheduleUnappliedDoses(batch: WriteBatch, childId: string, birthDate: string): void {
    for (const record of this.recordService.byChild(childId)) {
      if (record.applicationDate) {
        continue;
      }
      const ageInMonths = this.vaccineService.recommendedAgeForDose(record.vaccineId, record.dose);
      batch.update(doc(this.recordsCol, record.id), {
        scheduledDate: addMonths(birthDate, ageInMonths),
      });
    }
  }

  async remove(id: string): Promise<void> {
    await deleteDoc(doc(this.col, id));
  }
}

import { Injectable, inject } from '@angular/core';
import { collection, deleteDoc, doc, updateDoc, writeBatch } from 'firebase/firestore';
import { Child } from 'src/app/shared/models/child.model';
import { FIRESTORE, collectionSignal, stripUndefined } from 'src/app/core/firestore';
import { VaccineService } from 'src/app/core/services/vaccine.service';

@Injectable({ providedIn: 'root' })
export class ChildService {
  private readonly db = inject(FIRESTORE);
  private readonly col = collection(this.db, 'children');
  private readonly recordsCol = collection(this.db, 'vaccination-records');
  private readonly vaccineService = inject(VaccineService);

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
    await updateDoc(doc(this.col, id), stripUndefined(changes));
  }

  async remove(id: string): Promise<void> {
    await deleteDoc(doc(this.col, id));
  }
}

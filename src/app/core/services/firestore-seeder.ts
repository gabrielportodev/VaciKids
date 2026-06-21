import { Injectable, inject } from '@angular/core';
import {
  CollectionReference,
  collection,
  doc,
  getDocs,
  limit,
  query,
  writeBatch,
} from 'firebase/firestore';
import { FIRESTORE, stripUndefined } from 'src/app/core/firestore';
import { environment } from 'src/environments/environment';
import { MOCK_CHILDREN } from 'src/app/shared/constants/mock-children.constant';
import { MOCK_RECORDS } from 'src/app/shared/constants/mock-records.constant';
import { MOCK_CAMPAIGNS } from 'src/app/shared/constants/mock-campaigns.constant';

@Injectable({ providedIn: 'root' })
export class FirestoreSeeder {
  private readonly db = inject(FIRESTORE);

  async seedIfEmpty(): Promise<void> {
    if (!environment.seedOnStart || this.usingPlaceholderConfig()) {
      return;
    }
    try {
      await Promise.all([
        this.seedCollection('children', MOCK_CHILDREN),
        this.seedCollection(
          'vaccination-records',
          MOCK_RECORDS.map(({ status, ...record }) => record),
        ),
        this.seedCollection('campaigns', MOCK_CAMPAIGNS),
      ]);
    } catch (error) {
      console.warn('[Firestore] seed ignorado:', (error as Error).message);
    }
  }

  private async seedCollection<T extends { id: string }>(path: string, items: T[]): Promise<void> {
    const col = collection(this.db, path) as CollectionReference;
    const existing = await getDocs(query(col, limit(1)));
    if (!existing.empty) {
      return;
    }
    const batch = writeBatch(this.db);
    for (const { id, ...data } of items) {
      batch.set(doc(col, id), stripUndefined(data));
    }
    await batch.commit();
    console.info(`[Firestore] coleção "${path}" semeada com ${items.length} documento(s).`);
  }

  private usingPlaceholderConfig(): boolean {
    return environment.firebase.projectId.startsWith('YOUR_');
  }
}

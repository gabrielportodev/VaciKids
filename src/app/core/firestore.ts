import { InjectionToken, Provider, Signal, signal } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  CollectionReference,
  Firestore,
  getFirestore,
  onSnapshot,
  Query,
} from 'firebase/firestore';
import { environment } from 'src/environments/environment';

export const FIRESTORE = new InjectionToken<Firestore>('FIRESTORE');

export function provideFirestore(): Provider {
  return {
    provide: FIRESTORE,
    useFactory: () => getFirestore(initializeApp(environment.firebase)),
  };
}

export type CollectionSignal<T> = Signal<T[]> & { readonly loading: Signal<boolean> };

export function collectionSignal<T extends { id: string }>(
  ref: CollectionReference | Query,
): CollectionSignal<T> {
  const data = signal<T[]>([]);
  const loading = signal(true);
  onSnapshot(
    ref,
    (snapshot) => {
      data.set(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as T));
      loading.set(false);
    },
    (error) => {
      console.warn('[Firestore] falha ao ler coleção:', error.message);
      loading.set(false);
    },
  );
  const result = data.asReadonly() as CollectionSignal<T>;
  (result as { loading: Signal<boolean> }).loading = loading.asReadonly();
  return result;
}

export function stripUndefined<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined),
  ) as Partial<T>;
}

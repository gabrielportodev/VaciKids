import { TestBed } from '@angular/core/testing';
import { ChildService } from './child.service';
import { VaccineService } from './vaccine.service';
import { VaccinationRecordService } from './vaccination-record.service';
import { FIRESTORE } from 'src/app/core/firestore';
import { VaccinationRecord } from 'src/app/shared/models/vaccination-record.model';

interface RawDoc {
  id: string;
  data: () => Record<string, unknown>;
}

let emit: (docs: RawDoc[]) => void = () => undefined;
const updateDocMock = vi.fn();
const batchUpdate = vi.fn();
const batchSet = vi.fn();
const batchCommit = vi.fn(() => Promise.resolve());

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(() => ({})),
  doc: vi.fn((_col: unknown, id?: string) => ({ id: id ?? 'new' })),
  updateDoc: (...args: unknown[]) => updateDocMock(...args),
  deleteDoc: vi.fn(() => Promise.resolve()),
  writeBatch: () => ({ update: batchUpdate, set: batchSet, commit: batchCommit }),
  onSnapshot: (_ref: unknown, next: (snapshot: { docs: RawDoc[] }) => void) => {
    emit = (docs) => next({ docs });
    return () => undefined;
  },
}));

const records: VaccinationRecord[] = [
  {
    id: 'rec1',
    childId: 'c1',
    vaccineId: 'v1',
    dose: 1,
    scheduledDate: '2020-02-01',
    status: 'overdue',
  },
  {
    id: 'rec2',
    childId: 'c1',
    vaccineId: 'v1',
    dose: 2,
    scheduledDate: '2020-04-01',
    applicationDate: '2020-04-05',
    status: 'applied',
  },
];

describe('ChildService.update', () => {
  let service: ChildService;

  beforeEach(() => {
    updateDocMock.mockClear();
    batchUpdate.mockClear();
    batchCommit.mockClear();

    TestBed.configureTestingModule({
      providers: [
        { provide: FIRESTORE, useValue: {} },
        { provide: VaccinationRecordService, useValue: { byChild: () => records } },
        { provide: VaccineService, useValue: { recommendedAgeForDose: () => 2 } },
      ],
    });
    service = TestBed.inject(ChildService);
    emit([{ id: 'c1', data: () => ({ name: 'Helena', birthDate: '2020-01-01' }) }]);
  });

  it('should patch directly when the birth date does not change', async () => {
    await service.update('c1', { name: 'Helena Souza' });

    expect(updateDocMock).toHaveBeenCalledTimes(1);
    expect(batchUpdate).not.toHaveBeenCalled();
  });

  it('should recalculate only the unapplied doses when the birth date changes', async () => {
    await service.update('c1', { birthDate: '2021-01-01' });

    expect(updateDocMock).not.toHaveBeenCalled();
    expect(batchCommit).toHaveBeenCalledTimes(1);

    const rescheduled = batchUpdate.mock.calls.filter((call) => 'scheduledDate' in (call[1] ?? {}));
    expect(rescheduled).toHaveLength(1);
    expect(rescheduled[0][0]).toEqual({ id: 'rec1' });
    expect(rescheduled[0][1]).toEqual({ scheduledDate: '2021-03-01' });
  });
});

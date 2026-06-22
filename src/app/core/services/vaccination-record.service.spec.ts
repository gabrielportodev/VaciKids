import { TestBed } from '@angular/core/testing';
import { VaccinationRecordService } from './vaccination-record.service';
import { FIRESTORE } from 'src/app/core/firestore';

interface RawDoc {
  id: string;
  data: () => Record<string, unknown>;
}

let emit: (docs: RawDoc[]) => void = () => undefined;
const updateDocMock = vi.fn();

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(() => ({})),
  doc: vi.fn((_col: unknown, id: string) => ({ id })),
  updateDoc: (...args: unknown[]) => updateDocMock(...args),
  onSnapshot: (_ref: unknown, next: (snapshot: { docs: RawDoc[] }) => void) => {
    emit = (docs) => next({ docs });
    return () => undefined;
  },
}));

describe('VaccinationRecordService (system date 2026-06-21)', () => {
  let service: VaccinationRecordService;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 5, 21, 10, 30));
    updateDocMock.mockClear();

    TestBed.configureTestingModule({
      providers: [{ provide: FIRESTORE, useValue: {} }],
    });
    service = TestBed.inject(VaccinationRecordService);

    emit([
      {
        id: 'r1',
        data: () => ({ childId: 'c1', vaccineId: 'v1', dose: 1, scheduledDate: '2020-01-01' }),
      },
      {
        id: 'r2',
        data: () => ({ childId: 'c1', vaccineId: 'v1', dose: 2, scheduledDate: '2030-01-01' }),
      },
      {
        id: 'r3',
        data: () => ({
          childId: 'c1',
          vaccineId: 'v2',
          dose: 1,
          scheduledDate: '2021-01-01',
          applicationDate: '2021-01-10',
        }),
      },
      {
        id: 'r4',
        data: () => ({ childId: 'c2', vaccineId: 'v1', dose: 1, scheduledDate: '2020-01-01' }),
      },
    ]);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should filter records by child and resolve their status', () => {
    const records = service.byChild('c1');
    expect(records).toHaveLength(3);
    expect(records.map((r) => r.id).sort()).toEqual(['r1', 'r2', 'r3']);
  });

  it('should expose only the overdue records of a child', () => {
    const overdue = service.overdueByChild('c1');
    expect(overdue).toHaveLength(1);
    expect(overdue[0].id).toBe('r1');
  });

  it('should summarize a child as applied/pending/overdue', () => {
    expect(service.summaryByChild('c1')).toEqual({
      applied: 1,
      pending: 1,
      overdue: 1,
      total: 3,
      appliedPercent: 33,
      overduePercent: 33,
    });
  });

  it('should persist an application stripping empty optional fields', async () => {
    await service.registerApplication('r1', {
      applicationDate: '2026-06-01',
      healthUnit: 'UBS Central',
      batch: 'ABC-1234',
    });

    expect(updateDocMock).toHaveBeenCalledTimes(1);
    expect(updateDocMock.mock.calls[0][0]).toEqual({ id: 'r1' });
    expect(updateDocMock.mock.calls[0][1]).toEqual({
      applicationDate: '2026-06-01',
      healthUnit: 'UBS Central',
      notes: 'Lote: ABC-1234',
    });
  });

  it('should omit healthUnit and notes when not provided', async () => {
    await service.registerApplication('r1', { applicationDate: '2026-06-01' });

    expect(updateDocMock.mock.calls[0][1]).toEqual({ applicationDate: '2026-06-01' });
  });
});

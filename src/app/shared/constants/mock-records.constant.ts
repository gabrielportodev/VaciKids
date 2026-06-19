import { VaccinationRecord } from 'src/app/shared/models/vaccination-record.model';

export const MOCK_RECORDS: VaccinationRecord[] = [
  {
    id: 'rec-1',
    childId: 'child-1',
    vaccineId: 'bcg',
    dose: 1,
    scheduledDate: '2024-01-15',
    applicationDate: '2024-01-15',
    status: 'applied',
    healthUnit: 'UBS Central',
  },
  {
    id: 'rec-2',
    childId: 'child-1',
    vaccineId: 'penta',
    dose: 1,
    scheduledDate: '2024-03-15',
    applicationDate: '2024-03-20',
    status: 'applied',
    healthUnit: 'UBS Central',
  },
  {
    id: 'rec-3',
    childId: 'child-1',
    vaccineId: 'penta',
    dose: 2,
    scheduledDate: '2024-05-15',
    status: 'overdue',
  },

  {
    id: 'rec-4',
    childId: 'child-2',
    vaccineId: 'triplice-viral',
    dose: 1,
    scheduledDate: '2022-09-03',
    applicationDate: '2022-09-10',
    status: 'applied',
    healthUnit: 'UBS Jardim',
  },
];

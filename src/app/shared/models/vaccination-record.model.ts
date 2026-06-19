import { VaccinationStatus } from 'src/app/shared/models/vaccination-status.model';

export interface VaccinationRecord {
  id: string;
  childId: string;
  vaccineId: string;
  dose: number;
  scheduledDate: string;
  applicationDate?: string;
  status: VaccinationStatus;
  healthUnit?: string;
  notes?: string;
}

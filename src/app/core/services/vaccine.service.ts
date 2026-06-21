import { Injectable, signal } from '@angular/core';
import { Vaccine } from 'src/app/shared/models/vaccine.model';
import { VACCINE_CALENDAR } from 'src/app/shared/constants/vaccine-calendar.constant';
import { VaccinationRecord } from 'src/app/shared/models/vaccination-record.model';
import { addMonths } from 'src/app/core/utils/date.util';

@Injectable({ providedIn: 'root' })
export class VaccineService {
  private readonly vaccines = signal<Vaccine[]>([...VACCINE_CALENDAR]);

  readonly all = this.vaccines.asReadonly();

  getById(id: string): Vaccine | undefined {
    return this.vaccines().find((vaccine) => vaccine.id === id);
  }

  recommendedUpToAge(ageInMonths: number): Vaccine[] {
    return this.vaccines().filter((vaccine) => vaccine.recommendedAgeInMonths <= ageInMonths);
  }

  recommendedAgeForDose(vaccineId: string, dose: number): number {
    return this.getById(vaccineId)?.recommendedAgesInMonths[dose - 1] ?? 0;
  }

  recordsForChild(childId: string, birthDate: string): Omit<VaccinationRecord, 'id' | 'status'>[] {
    return this.vaccines().flatMap((vaccine) =>
      vaccine.recommendedAgesInMonths.map((ageInMonths, index) => ({
        childId,
        vaccineId: vaccine.id,
        dose: index + 1,
        scheduledDate: addMonths(birthDate, ageInMonths),
      })),
    );
  }
}

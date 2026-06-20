import { Injectable, signal } from '@angular/core';
import { Vaccine } from 'src/app/shared/models/vaccine.model';
import { VACCINE_CALENDAR } from 'src/app/shared/constants/vaccine-calendar.constant';

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
}

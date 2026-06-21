import { Pipe, PipeTransform, inject } from '@angular/core';
import { VaccineService } from 'src/app/core/services/vaccine.service';

@Pipe({ name: 'vaccineName' })
export class VaccineNamePipe implements PipeTransform {
  private readonly vaccineService = inject(VaccineService);

  transform(vaccineId: string | null | undefined): string {
    if (!vaccineId) {
      return '';
    }
    return this.vaccineService.getById(vaccineId)?.name ?? vaccineId;
  }
}

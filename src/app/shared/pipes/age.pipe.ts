import { Pipe, PipeTransform } from '@angular/core';
import { formatAge } from 'src/app/core/utils';

@Pipe({ name: 'age' })
export class AgePipe implements PipeTransform {
  transform(birthDate: string | null | undefined): string {
    if (!birthDate) {
      return '';
    }
    return formatAge(birthDate);
  }
}

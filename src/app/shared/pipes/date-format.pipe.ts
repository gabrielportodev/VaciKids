import { Pipe, PipeTransform } from '@angular/core';
import { parseIsoDate } from 'src/app/core/utils';

@Pipe({ name: 'dateFormat' })
export class DateFormatPipe implements PipeTransform {
  transform(isoDate: string | null | undefined): string {
    if (!isoDate) {
      return '—';
    }
    return parseIsoDate(isoDate).toLocaleDateString('pt-BR');
  }
}

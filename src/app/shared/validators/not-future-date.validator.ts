import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isFuture } from 'src/app/core/utils';

export function notFutureDate(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;
  if (!value) {
    return null;
  }
  return isFuture(value) ? { futureDate: true } : null;
}

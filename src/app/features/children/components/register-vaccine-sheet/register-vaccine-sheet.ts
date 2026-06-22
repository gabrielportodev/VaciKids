import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VaccinationRecord } from 'src/app/shared/models/vaccination-record.model';
import { toIsoDate, today } from 'src/app/core/utils';
import { notFutureDate } from 'src/app/shared/validators/not-future-date.validator';
import { Loading } from 'src/app/shared/components/loading/loading';
import { IonIcon } from '@ionic/angular/standalone';

export interface RegisterData {
  applicationDate: string;
  healthUnit?: string;
  batch?: string;
}

@Component({
  selector: 'app-register-vaccine-sheet',
  imports: [ReactiveFormsModule, Loading, IonIcon],
  templateUrl: './register-vaccine-sheet.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterVaccineSheet {
  private readonly fb = inject(FormBuilder);

  readonly record = input.required<VaccinationRecord>();
  readonly vaccineName = input.required<string>();
  readonly busy = input(false, { transform: booleanAttribute });

  readonly confirmed = output<RegisterData>();
  readonly cancelled = output<void>();

  readonly maxDate = toIsoDate(today());

  readonly form = this.fb.nonNullable.group({
    applicationDate: [this.maxDate, [Validators.required, notFutureDate]],
    healthUnit: [''],
    batch: [''],
  });

  onBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.cancelled.emit();
    }
  }

  confirm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { applicationDate, healthUnit, batch } = this.form.getRawValue();
    this.confirmed.emit({
      applicationDate,
      healthUnit: healthUnit || undefined,
      batch: batch || undefined,
    });
  }
}

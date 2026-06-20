import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VaccinationRecord } from 'src/app/shared/models/vaccination-record.model';
import { toIsoDate, today } from 'src/app/core/utils/date.util';
import { Icon } from 'src/app/shared/components/icon/icon';

export interface RegisterData {
  applicationDate: string;
  healthUnit?: string;
  batch?: string;
}

@Component({
  selector: 'app-register-vaccine-sheet',
  imports: [ReactiveFormsModule, Icon],
  templateUrl: './register-vaccine-sheet.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterVaccineSheet {
  private readonly fb = inject(FormBuilder);

  readonly record = input.required<VaccinationRecord>();
  readonly vaccineName = input.required<string>();

  readonly confirmed = output<RegisterData>();
  readonly cancelled = output<void>();

  readonly form = this.fb.nonNullable.group({
    applicationDate: [toIsoDate(today()), Validators.required],
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

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChildService } from 'src/app/core/services/child.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DetailHeader } from 'src/app/shared/components/detail-header/detail-header';
import { Loading } from 'src/app/shared/components/loading/loading';
import { IonIcon } from '@ionic/angular/standalone';
import { getInitials, toIsoDate, today } from 'src/app/core/utils';
import { notFutureDate } from 'src/app/shared/validators/not-future-date.validator';

type Gender = 'male' | 'female';

const MAX_PHOTO_SIZE_BYTES = 2 * 1024 * 1024;

@Component({
  selector: 'app-child-form',
  imports: [ReactiveFormsModule, DetailHeader, Loading, IonIcon],
  templateUrl: './child-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildForm {
  private readonly fb = inject(FormBuilder);
  private readonly childService = inject(ChildService);
  private readonly notifications = inject(NotificationService);
  private readonly router = inject(Router);

  readonly id = input<string>();
  readonly isEdit = computed(() => !!this.id());

  readonly maxDate = toIsoDate(today());

  readonly photoPreview = signal<string | null>(null);

  readonly submitting = signal(false);
  readonly deleting = signal(false);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    birthDate: ['', [Validators.required, notFutureDate]],
    gender: ['female' as Gender],
    photoUrl: [''],
  });

  readonly initials = computed(() => getInitials(this.form.controls.name.value));

  private patched = false;
  private readonly prefill = effect(() => {
    const id = this.id();
    if (!id || this.patched) return;
    const existing = this.childService.getById(id);
    if (!existing) return;

    this.patched = true;
    this.form.patchValue({
      name: existing.name,
      birthDate: existing.birthDate,
      gender: existing.gender === 'male' ? 'male' : 'female',
      photoUrl: existing.photoUrl ?? '',
    });
    this.photoPreview.set(existing.photoUrl ?? null);
  });

  setGender(gender: Gender): void {
    this.form.controls.gender.setValue(gender);
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (file.size > MAX_PHOTO_SIZE_BYTES) {
      input.value = '';
      void this.notifications.error(null, 'A foto deve ter no máximo 2MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      this.photoPreview.set(url);
      this.form.controls.photoUrl.setValue(url);
    };
    reader.readAsDataURL(file);
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { name, birthDate, gender, photoUrl } = this.form.getRawValue();
    const value = { name, birthDate, gender, photoUrl: photoUrl || undefined };
    this.submitting.set(true);
    try {
      if (this.isEdit()) {
        await this.childService.update(this.id()!, value);
        await this.router.navigate(['/children', this.id()]);
        await this.notifications.success('Criança atualizada com sucesso.');
      } else {
        const created = await this.childService.create(value);
        await this.router.navigate(['/children', created.id]);
        await this.notifications.success('Criança adicionada com sucesso.');
      }
    } catch (error) {
      await this.notifications.error(error, 'Não foi possível salvar a criança.');
    } finally {
      this.submitting.set(false);
    }
  }

  async remove(): Promise<void> {
    if (!this.isEdit()) return;
    if (!(await this.notifications.confirm('Tem certeza que deseja excluir esta criança?'))) return;
    this.deleting.set(true);
    try {
      await this.childService.remove(this.id()!);
      await this.router.navigate(['/children']);
      await this.notifications.success('Criança removida com sucesso.');
    } catch (error) {
      await this.notifications.error(error, 'Não foi possível remover a criança.');
    } finally {
      this.deleting.set(false);
    }
  }
}

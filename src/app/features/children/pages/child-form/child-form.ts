import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChildService } from 'src/app/core/services/child.service';
import { DetailHeader } from 'src/app/shared/components/detail-header/detail-header';
import { IonIcon } from '@ionic/angular/standalone';
import { getInitials } from 'src/app/core/utils/name.util';

type Gender = 'male' | 'female';

@Component({
  selector: 'app-child-form',
  imports: [ReactiveFormsModule, DetailHeader, IonIcon],
  templateUrl: './child-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly childService = inject(ChildService);
  private readonly router = inject(Router);

  readonly id = input<string>();
  readonly isEdit = computed(() => !!this.id());

  readonly photoPreview = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    birthDate: ['', Validators.required],
    gender: ['female' as Gender],
    photoUrl: [''],
  });

  readonly initials = computed(() => getInitials(this.form.controls.name.value));

  ngOnInit(): void {
    const id = this.id();
    const existing = id ? this.childService.getById(id) : undefined;
    if (!existing) {
      return;
    }
    this.form.patchValue({
      name: existing.name,
      birthDate: existing.birthDate,
      gender: existing.gender === 'male' ? 'male' : 'female',
      photoUrl: existing.photoUrl ?? '',
    });
    this.photoPreview.set(existing.photoUrl ?? null);
  }

  setGender(gender: Gender): void {
    this.form.controls.gender.setValue(gender);
  }

  onPhotoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      this.photoPreview.set(url);
      this.form.controls.photoUrl.setValue(url);
    };
    reader.readAsDataURL(file);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { name, birthDate, gender, photoUrl } = this.form.getRawValue();
    const value = { name, birthDate, gender, photoUrl: photoUrl || undefined };
    if (this.isEdit()) {
      this.childService.update(this.id()!, value);
      this.router.navigate(['/children', this.id()]);
    } else {
      const created = this.childService.create(value);
      this.router.navigate(['/children', created.id]);
    }
  }

  remove(): void {
    if (!this.isEdit()) return;
    if (confirm('Tem certeza que deseja excluir esta criança?')) {
      this.childService.remove(this.id()!);
      this.router.navigate(['/children']);
    }
  }
}

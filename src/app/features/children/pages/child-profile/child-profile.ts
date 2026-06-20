import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonAvatar, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { ChildService } from 'src/app/core/services/child.service';
import { VaccinationRecordService } from 'src/app/core/services/vaccination-record.service';
import { VaccineService } from 'src/app/core/services/vaccine.service';
import { VaccinationRecord } from 'src/app/shared/models/vaccination-record.model';
import { AgePipe } from 'src/app/shared/pipes/age.pipe';
import { DetailHeader } from 'src/app/shared/components/detail-header/detail-header';
import { Icon } from 'src/app/shared/components/icon/icon';
import { getInitials } from 'src/app/core/utils/name.util';
import { VaccineTimeline } from 'src/app/features/children/components/vaccine-timeline/vaccine-timeline';
import {
  RegisterData,
  RegisterVaccineSheet,
} from 'src/app/features/children/components/register-vaccine-sheet/register-vaccine-sheet';

@Component({
  selector: 'app-child-profile',
  imports: [
    RouterLink,
    IonCard,
    IonCardContent,
    IonAvatar,
    AgePipe,
    DetailHeader,
    Icon,
    VaccineTimeline,
    RegisterVaccineSheet,
  ],
  templateUrl: './child-profile.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildProfile {
  private readonly childService = inject(ChildService);
  private readonly recordService = inject(VaccinationRecordService);
  private readonly vaccineService = inject(VaccineService);

  readonly id = input.required<string>();

  readonly child = computed(() => this.childService.getById(this.id()));
  readonly records = computed(() => this.recordService.byChild(this.id()));
  readonly summary = computed(() => this.recordService.summaryByChild(this.id()));

  readonly selectedRecord = signal<VaccinationRecord | null>(null);

  readonly initials = computed(() => getInitials(this.child()?.name));

  vaccineName(vaccineId: string): string {
    return this.vaccineService.getById(vaccineId)?.name ?? vaccineId;
  }

  openRegister(record: VaccinationRecord): void {
    this.selectedRecord.set(record);
  }

  closeSheet(): void {
    this.selectedRecord.set(null);
  }

  confirmRegister(data: RegisterData): void {
    const record = this.selectedRecord();
    if (record) {
      this.recordService.registerApplication(record.id, data);
    }
    this.closeSheet();
  }
}

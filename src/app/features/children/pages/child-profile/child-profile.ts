import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonIcon, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { ChildService } from 'src/app/core/services/child.service';
import { VaccinationRecordService } from 'src/app/core/services/vaccination-record.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VaccinationRecord } from 'src/app/shared/models/vaccination-record.model';
import { AgePipe } from 'src/app/shared/pipes/age.pipe';
import { VaccineNamePipe } from 'src/app/shared/pipes/vaccine-name.pipe';
import { DetailHeader } from 'src/app/shared/components/detail-header/detail-header';
import { Loading } from 'src/app/shared/components/loading/loading';
import { ChildAvatar } from 'src/app/shared/components/child-avatar/child-avatar';
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
    ChildAvatar,
    AgePipe,
    VaccineNamePipe,
    DetailHeader,
    Loading,
    IonIcon,
    VaccineTimeline,
    RegisterVaccineSheet,
  ],
  templateUrl: './child-profile.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildProfile {
  private readonly childService = inject(ChildService);
  private readonly recordService = inject(VaccinationRecordService);
  private readonly notifications = inject(NotificationService);

  readonly id = input.required<string>();

  readonly child = computed(() => this.childService.getById(this.id()));
  readonly records = computed(() => this.recordService.byChild(this.id()));
  readonly summary = computed(() => this.recordService.summaryByChild(this.id()));

  readonly loading = computed(
    () => this.childService.all.loading() || this.recordService.loading(),
  );

  readonly selectedRecord = signal<VaccinationRecord | null>(null);
  readonly registering = signal(false);

  openRegister(record: VaccinationRecord): void {
    this.selectedRecord.set(record);
  }

  closeSheet(): void {
    this.selectedRecord.set(null);
  }

  async confirmRegister(data: RegisterData): Promise<void> {
    const record = this.selectedRecord();
    if (!record) return;
    this.registering.set(true);
    try {
      await this.recordService.registerApplication(record.id, data);
      this.closeSheet();
      await this.notifications.success('Vacina registrada com sucesso.');
    } catch (error) {
      await this.notifications.error(error, 'Não foi possível registrar a vacina.');
    } finally {
      this.registering.set(false);
    }
  }
}

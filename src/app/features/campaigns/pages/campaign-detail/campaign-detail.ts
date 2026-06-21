import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonIcon, IonCard, IonCardContent, IonItem } from '@ionic/angular/standalone';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { ChildService } from 'src/app/core/services/child.service';
import { VaccinationRecordService } from 'src/app/core/services/vaccination-record.service';
import { VaccinationStatus } from 'src/app/shared/models/vaccination-status.model';
import { getAgeInMonths, campaignAudienceLabel, aggregateStatus } from 'src/app/core/utils';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
import { AgePipe } from 'src/app/shared/pipes/age.pipe';
import { VaccineNamePipe } from 'src/app/shared/pipes/vaccine-name.pipe';
import { StatusBadge } from 'src/app/shared/components/status-badge/status-badge';
import { Loading } from 'src/app/shared/components/loading/loading';

@Component({
  selector: 'app-campaign-detail',
  imports: [
    RouterLink,
    IonCard,
    IonCardContent,
    IonItem,
    DateFormatPipe,
    AgePipe,
    VaccineNamePipe,
    StatusBadge,
    Loading,
    IonIcon,
  ],
  templateUrl: './campaign-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignDetail {
  private readonly campaignService = inject(CampaignService);
  private readonly childService = inject(ChildService);
  private readonly recordService = inject(VaccinationRecordService);

  readonly id = input.required<string>();
  readonly campaign = computed(() => this.campaignService.getById(this.id()));
  readonly loading = this.campaignService.all.loading;

  readonly audience = computed(() => {
    const c = this.campaign();
    return c ? campaignAudienceLabel(c.minimumAgeInMonths, c.maximumAgeInMonths) : '';
  });

  readonly eligible = computed(() => {
    const c = this.campaign();
    if (!c) return [];
    return this.childService
      .all()
      .filter((child) => {
        const age = getAgeInMonths(child.birthDate);
        return age >= c.minimumAgeInMonths && age <= c.maximumAgeInMonths;
      })
      .map((child) => ({ child, status: this.statusFor(child.id, c.relatedVaccineId) }));
  });

  private statusFor(childId: string, vaccineId?: string): VaccinationStatus {
    if (!vaccineId) return 'pending';
    return aggregateStatus(this.recordService.byChildAndVaccine(childId, vaccineId));
  }
}

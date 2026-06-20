import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonCard, IonCardContent, IonItem } from '@ionic/angular/standalone';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { ChildService } from 'src/app/core/services/child.service';
import { VaccineService } from 'src/app/core/services/vaccine.service';
import { VaccinationRecordService } from 'src/app/core/services/vaccination-record.service';
import { VaccinationStatus } from 'src/app/shared/models/vaccination-status.model';
import { getAgeInMonths, campaignAudienceLabel } from 'src/app/core/utils/age.util';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
import { AgePipe } from 'src/app/shared/pipes/age.pipe';
import { StatusBadge } from 'src/app/shared/components/status-badge/status-badge';
import { Icon } from 'src/app/shared/components/icon/icon';

@Component({
  selector: 'app-campaign-detail',
  imports: [RouterLink, IonCard, IonCardContent, IonItem, DateFormatPipe, AgePipe, StatusBadge, Icon],
  templateUrl: './campaign-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignDetail {
  private readonly campaignService = inject(CampaignService);
  private readonly childService = inject(ChildService);
  private readonly vaccineService = inject(VaccineService);
  private readonly recordService = inject(VaccinationRecordService);

  readonly id = input.required<string>();
  readonly campaign = computed(() => this.campaignService.getById(this.id()));

  readonly audience = computed(() => {
    const c = this.campaign();
    return c ? campaignAudienceLabel(c.minimumAgeInMonths, c.maximumAgeInMonths) : '';
  });

  readonly vaccineName = computed(() => {
    const vaccineId = this.campaign()?.relatedVaccineId;
    return vaccineId ? (this.vaccineService.getById(vaccineId)?.name ?? vaccineId) : null;
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
    const records = this.recordService.byChildAndVaccine(childId, vaccineId);
    if (records.some((r) => r.status === 'applied')) return 'applied';
    if (records.some((r) => r.status === 'overdue')) return 'overdue';
    return 'pending';
  }
}

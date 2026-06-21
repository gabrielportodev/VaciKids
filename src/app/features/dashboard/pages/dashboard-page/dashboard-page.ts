import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChildService } from 'src/app/core/services/child.service';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { VaccinationRecordService } from 'src/app/core/services/vaccination-record.service';
import { VaccineService } from 'src/app/core/services/vaccine.service';
import { daysOverdue } from 'src/app/core/utils/date.util';
import { CampaignCard } from 'src/app/shared/components/campaign-card/campaign-card';
import { ChildCard } from 'src/app/shared/components/child-card/child-card';
import { EmptyState } from 'src/app/shared/components/empty-state/empty-state';
import { Loading } from 'src/app/shared/components/loading/loading';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterLink, CampaignCard, ChildCard, EmptyState, Loading, IonIcon],
  templateUrl: './dashboard-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
  private readonly childService = inject(ChildService);
  private readonly campaignService = inject(CampaignService);
  private readonly recordService = inject(VaccinationRecordService);
  private readonly vaccineService = inject(VaccineService);

  readonly children = this.childService.all;
  readonly activeCampaigns = computed(() => this.campaignService.active());

  readonly loading = computed(
    () =>
      this.childService.all.loading() ||
      this.campaignService.all.loading() ||
      this.recordService.loading(),
  );

  readonly childCards = computed(() =>
    this.children().map((child) => ({
      child,
      summary: this.recordService.summaryByChild(child.id),
    })),
  );

  readonly overdueAlerts = computed(() =>
    this.children().flatMap((child) =>
      this.recordService.overdueByChild(child.id).map((record) => ({
        childId: child.id,
        childName: child.name,
        vaccine: this.vaccineService.getById(record.vaccineId)?.name ?? record.vaccineId,
        dose: record.dose,
        days: daysOverdue(record.scheduledDate),
      })),
    ),
  );
}

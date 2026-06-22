import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonIcon, IonItem } from '@ionic/angular/standalone';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
import { campaignAudienceLabel } from 'src/app/core/utils';

export type CampaignState = 'active' | 'upcoming' | 'ended';

@Component({
  selector: 'app-campaign-card',
  imports: [RouterLink, IonItem, DateFormatPipe, IonIcon],
  templateUrl: './campaign-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignCard {
  readonly campaign = input.required<Campaign>();
  readonly state = input<CampaignState>('active');

  readonly isEnded = computed(() => this.state() === 'ended');

  readonly audience = computed(() =>
    campaignAudienceLabel(this.campaign().minimumAgeInMonths, this.campaign().maximumAgeInMonths),
  );
}

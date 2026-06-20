import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonIcon, IonItem } from '@ionic/angular/standalone';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
import { campaignAudienceLabel } from 'src/app/core/utils/age.util';

@Component({
  selector: 'app-campaign-card',
  imports: [RouterLink, IonItem, DateFormatPipe, IonIcon],
  templateUrl: './campaign-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignCard {
  readonly campaign = input.required<Campaign>();
  readonly active = input<boolean>(false);
  readonly ended = input<boolean>(false);

  readonly audience = computed(() =>
    campaignAudienceLabel(this.campaign().minimumAgeInMonths, this.campaign().maximumAgeInMonths),
  );
}

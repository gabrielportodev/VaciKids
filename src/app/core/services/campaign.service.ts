import { Injectable, signal } from '@angular/core';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { MOCK_CAMPAIGNS } from 'src/app/shared/constants/mock-campaigns.constant';
import { parseIsoDate, today } from 'src/app/core/utils/date.util';

@Injectable({ providedIn: 'root' })
export class CampaignService {
  private readonly campaigns = signal<Campaign[]>([...MOCK_CAMPAIGNS]);

  readonly all = this.campaigns.asReadonly();

  getById(id: string): Campaign | undefined {
    return this.campaigns().find((campaign) => campaign.id === id);
  }

  active(): Campaign[] {
    const now = today().getTime();
    return this.campaigns().filter((campaign) => {
      const start = parseIsoDate(campaign.startDate).getTime();
      const end = parseIsoDate(campaign.endDate).getTime();
      return now >= start && now <= end;
    });
  }
}

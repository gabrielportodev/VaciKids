import { Campaign } from 'src/app/shared/models/campaign.model';
import { parseIsoDate, today } from 'src/app/core/utils/date.util';

export function isCampaignActive(campaign: Campaign, reference: Date = today()): boolean {
  const now = reference.getTime();
  return (
    now >= parseIsoDate(campaign.startDate).getTime() &&
    now <= parseIsoDate(campaign.endDate).getTime()
  );
}

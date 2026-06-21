import { isCampaignActive } from './campaign.util';
import { Campaign } from 'src/app/shared/models/campaign.model';

function campaign(startDate: string, endDate: string): Campaign {
  return {
    id: 'campaign-1',
    title: 'Campanha',
    description: 'Descrição',
    startDate,
    endDate,
    minimumAgeInMonths: 0,
    maximumAgeInMonths: 60,
  };
}

describe('campaign.util', () => {
  describe('isCampaignActive', () => {
    const reference = new Date(2026, 5, 21);

    it('should be active when the reference date is within the period', () => {
      expect(isCampaignActive(campaign('2026-06-01', '2026-06-30'), reference)).toBe(true);
    });

    it('should be active on the boundary dates', () => {
      expect(isCampaignActive(campaign('2026-06-21', '2026-06-30'), reference)).toBe(true);
      expect(isCampaignActive(campaign('2026-06-01', '2026-06-21'), reference)).toBe(true);
    });

    it('should be inactive before the start date', () => {
      expect(isCampaignActive(campaign('2026-07-01', '2026-07-30'), reference)).toBe(false);
    });

    it('should be inactive after the end date', () => {
      expect(isCampaignActive(campaign('2026-05-01', '2026-05-31'), reference)).toBe(false);
    });
  });
});

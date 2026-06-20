import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { isPast, parseIsoDate } from 'src/app/core/utils/date.util';
import { Icon } from 'src/app/shared/components/icon/icon';
import { CampaignCard } from 'src/app/shared/components/campaign-card/campaign-card';
import { EmptyState } from 'src/app/shared/components/empty-state/empty-state';

type Tab = 'active' | 'ended';

interface AgeFilter {
  value: string;
  label: string;
  min: number;
  max: number;
}

const AGE_FILTERS: AgeFilter[] = [
  { value: 'all', label: 'Qualquer idade', min: 0, max: Infinity },
  { value: 'under1', label: 'Menos de 1 ano', min: 0, max: 11 },
  { value: '1to2', label: '1 a 2 anos', min: 12, max: 35 },
  { value: '3to5', label: '3 a 5 anos', min: 36, max: 71 },
  { value: '6plus', label: '6 anos ou mais', min: 72, max: Infinity },
];

@Component({
  selector: 'app-campaign-list',
  imports: [CampaignCard, EmptyState, Icon],
  templateUrl: './campaign-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignList {
  private readonly campaignService = inject(CampaignService);

  readonly campaigns = this.campaignService.all;
  readonly tab = signal<Tab>('active');

  readonly ageFilters = AGE_FILTERS;
  readonly ageFilter = signal<string>('all');
  readonly dateFilter = signal<string>('');

  private readonly ongoing = computed(() => this.campaigns().filter((c) => !isPast(c.endDate)));
  private readonly ended = computed(() => this.campaigns().filter((c) => isPast(c.endDate)));

  readonly counts = computed(() => ({
    active: this.ongoing().length,
    ended: this.ended().length,
  }));

  readonly hasFilters = computed(() => this.ageFilter() !== 'all' || this.dateFilter() !== '');

  readonly shown = computed(() => {
    const base = this.tab() === 'ended' ? this.ended() : this.ongoing();
    const age = AGE_FILTERS.find((f) => f.value === this.ageFilter()) ?? AGE_FILTERS[0];
    const date = this.dateFilter();

    return base
      .filter((c) => age.min <= c.maximumAgeInMonths && age.max >= c.minimumAgeInMonths)
      .filter((c) => {
        if (!date) {
          return true;
        }
        const chosen = parseIsoDate(date).getTime();
        return (
          chosen >= parseIsoDate(c.startDate).getTime() &&
          chosen <= parseIsoDate(c.endDate).getTime()
        );
      });
  });

  setTab(tab: Tab): void {
    this.tab.set(tab);
  }

  onAgeFilter(event: Event): void {
    this.ageFilter.set((event.target as HTMLSelectElement).value);
  }

  onDateFilter(event: Event): void {
    this.dateFilter.set((event.target as HTMLInputElement).value);
  }

  clearFilters(): void {
    this.ageFilter.set('all');
    this.dateFilter.set('');
  }

  isActive(id: string): boolean {
    return this.campaignService.active().some((campaign) => campaign.id === id);
  }
}

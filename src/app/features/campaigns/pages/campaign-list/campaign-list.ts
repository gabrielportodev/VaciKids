import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { isPast, parseIsoDate } from 'src/app/core/utils';
import { IonIcon } from '@ionic/angular/standalone';
import { CampaignCard } from 'src/app/shared/components/campaign-card/campaign-card';
import { EmptyState } from 'src/app/shared/components/empty-state/empty-state';
import { Loading } from 'src/app/shared/components/loading/loading';
import { CHILD_AGE_FILTERS } from 'src/app/shared/constants/age-filter.constant';

type Tab = 'active' | 'ended';

@Component({
  selector: 'app-campaign-list',
  imports: [CampaignCard, EmptyState, Loading, IonIcon],
  templateUrl: './campaign-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignList {
  private readonly campaignService = inject(CampaignService);

  readonly campaigns = this.campaignService.all;
  readonly tab = signal<Tab>('active');

  readonly ageFilters = CHILD_AGE_FILTERS;
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
    const age = CHILD_AGE_FILTERS.find((f) => f.value === this.ageFilter()) ?? CHILD_AGE_FILTERS[0];
    const date = this.dateFilter();

    return base
      .filter((c) => age.min <= c.maximumAgeInMonths && c.minimumAgeInMonths < age.max)
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

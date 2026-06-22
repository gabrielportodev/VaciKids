import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
  signal,
} from '@angular/core';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { isCampaignActive, isFuture, isPast, parseIsoDate } from 'src/app/core/utils';
import { IonIcon } from '@ionic/angular/standalone';
import { CampaignCard, CampaignState } from 'src/app/shared/components/campaign-card/campaign-card';
import { EmptyState } from 'src/app/shared/components/empty-state/empty-state';
import { Loading } from 'src/app/shared/components/loading/loading';
import { AgeFilter, CHILD_AGE_FILTERS } from 'src/app/shared/constants/age-filter.constant';

@Component({
  selector: 'app-campaign-list',
  imports: [CampaignCard, EmptyState, Loading, IonIcon],
  templateUrl: './campaign-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignList {
  private readonly campaignService = inject(CampaignService);

  readonly campaigns = this.campaignService.all;
  readonly tab = signal<CampaignState>('active');

  readonly ageFilters = CHILD_AGE_FILTERS;
  readonly ageFilter = signal<string>('all');
  readonly dateFilter = signal<string>('');

  private readonly active = computed(() => this.campaigns().filter((c) => isCampaignActive(c)));
  private readonly upcoming = computed(() => this.campaigns().filter((c) => isFuture(c.startDate)));
  private readonly ended = computed(() => this.campaigns().filter((c) => isPast(c.endDate)));

  private readonly byTab: Record<CampaignState, Signal<Campaign[]>> = {
    active: this.active,
    upcoming: this.upcoming,
    ended: this.ended,
  };

  readonly counts = computed(() => ({
    active: this.active().length,
    upcoming: this.upcoming().length,
    ended: this.ended().length,
  }));

  readonly hasFilters = computed(() => this.ageFilter() !== 'all' || this.dateFilter() !== '');

  readonly shown = computed(() => {
    const ageRange = this.selectedAgeRange();
    const date = this.dateFilter();
    return this.byTab[this.tab()]()
      .filter((campaign) => this.matchesAge(campaign, ageRange))
      .filter((campaign) => this.matchesDate(campaign, date));
  });

  setTab(tab: CampaignState): void {
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

  private selectedAgeRange(): AgeFilter {
    return (
      CHILD_AGE_FILTERS.find((filter) => filter.value === this.ageFilter()) ?? CHILD_AGE_FILTERS[0]
    );
  }

  private matchesAge(campaign: Campaign, range: AgeFilter): boolean {
    return range.min <= campaign.maximumAgeInMonths && campaign.minimumAgeInMonths < range.max;
  }

  private matchesDate(campaign: Campaign, date: string): boolean {
    if (!date) {
      return true;
    }
    const chosen = parseIsoDate(date).getTime();
    return (
      chosen >= parseIsoDate(campaign.startDate).getTime() &&
      chosen <= parseIsoDate(campaign.endDate).getTime()
    );
  }
}

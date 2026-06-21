import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChildService } from 'src/app/core/services/child.service';
import { VaccinationRecordService } from 'src/app/core/services/vaccination-record.service';
import { getAgeInMonths } from 'src/app/core/utils';
import { ChildCard } from 'src/app/shared/components/child-card/child-card';
import { EmptyState } from 'src/app/shared/components/empty-state/empty-state';
import { Loading } from 'src/app/shared/components/loading/loading';
import { IonIcon } from '@ionic/angular/standalone';
import { CHILD_AGE_FILTERS } from 'src/app/shared/constants/age-filter.constant';

@Component({
  selector: 'app-children-list',
  imports: [RouterLink, ChildCard, EmptyState, Loading, IonIcon],
  templateUrl: './children-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildrenList {
  private readonly childService = inject(ChildService);
  private readonly recordService = inject(VaccinationRecordService);

  readonly children = this.childService.all;
  readonly search = signal('');

  readonly ageFilters = CHILD_AGE_FILTERS;
  readonly ageFilter = signal<string>('all');

  readonly hasFilters = computed(() => this.ageFilter() !== 'all');

  readonly childCards = computed(() => {
    const term = this.search().trim().toLowerCase();
    const range =
      CHILD_AGE_FILTERS.find((f) => f.value === this.ageFilter()) ?? CHILD_AGE_FILTERS[0];
    return this.children()
      .filter((child) => child.name.toLowerCase().includes(term))
      .filter((child) => {
        const months = getAgeInMonths(child.birthDate);
        return months >= range.min && months < range.max;
      })
      .map((child) => ({ child, summary: this.recordService.summaryByChild(child.id) }));
  });

  onSearch(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
  }

  onAgeFilter(event: Event): void {
    this.ageFilter.set((event.target as HTMLSelectElement).value);
  }
}

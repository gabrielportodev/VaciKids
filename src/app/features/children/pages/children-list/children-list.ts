import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChildService } from 'src/app/core/services/child.service';
import { VaccinationRecordService } from 'src/app/core/services/vaccination-record.service';
import { getAgeInMonths } from 'src/app/core/utils/age.util';
import { ChildCard } from 'src/app/shared/components/child-card/child-card';
import { EmptyState } from 'src/app/shared/components/empty-state/empty-state';
import { Icon } from 'src/app/shared/components/icon/icon';

interface AgeFilter {
  value: string;
  label: string;
  min: number;
  max: number;
}

const AGE_FILTERS: AgeFilter[] = [
  { value: 'all', label: 'Todas as idades', min: 0, max: Infinity },
  { value: 'under1', label: 'Menos de 1 ano', min: 0, max: 12 },
  { value: '1to2', label: '1 a 2 anos', min: 12, max: 36 },
  { value: '3to5', label: '3 a 5 anos', min: 36, max: 72 },
  { value: '6plus', label: '6 anos ou mais', min: 72, max: Infinity },
];

@Component({
  selector: 'app-children-list',
  imports: [RouterLink, ChildCard, EmptyState, Icon],
  templateUrl: './children-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildrenList {
  private readonly childService = inject(ChildService);
  private readonly recordService = inject(VaccinationRecordService);

  readonly children = this.childService.all;
  readonly search = signal('');

  readonly ageFilters = AGE_FILTERS;
  readonly ageFilter = signal<string>('all');

  readonly hasFilters = computed(() => this.ageFilter() !== 'all');

  readonly childCards = computed(() => {
    const term = this.search().trim().toLowerCase();
    const range = AGE_FILTERS.find((f) => f.value === this.ageFilter()) ?? AGE_FILTERS[0];
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

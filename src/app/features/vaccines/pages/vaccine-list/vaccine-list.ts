import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { VaccineService } from 'src/app/core/services/vaccine.service';
import { Vaccine } from 'src/app/shared/models/vaccine.model';
import { VaccineCard } from 'src/app/shared/components/vaccine-card/vaccine-card';
import { EmptyState } from 'src/app/shared/components/empty-state/empty-state';
import { Icon } from 'src/app/shared/components/icon/icon';
import { ageGroupLabel } from 'src/app/core/utils/age.util';

interface VaccineGroup {
  label: string;
  ageMonths: number;
  vaccines: Vaccine[];
}

interface AgeRangeFilter {
  value: string;
  label: string;
  min: number;
  max: number;
}

const AGE_RANGE_FILTERS: AgeRangeFilter[] = [
  { value: 'all', label: 'Qualquer idade', min: 0, max: Infinity },
  { value: 'birth', label: 'Ao nascer', min: 0, max: 0 },
  { value: 'firstSemester', label: '1 a 6 meses', min: 1, max: 6 },
  { value: 'secondSemester', label: '7 a 12 meses', min: 7, max: 12 },
  { value: 'afterYear', label: 'Após 1 ano', min: 13, max: Infinity },
];

@Component({
  selector: 'app-vaccine-list',
  imports: [VaccineCard, EmptyState, Icon],
  templateUrl: './vaccine-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VaccineList {
  private readonly vaccineService = inject(VaccineService);

  readonly search = signal('');
  readonly doseFilter = signal<string>('all');
  readonly ageFilter = signal<string>('all');

  readonly ageRangeFilters = AGE_RANGE_FILTERS;

  readonly doseOptions = computed(() =>
    [...new Set(this.vaccineService.all().map((v) => v.totalDoses))].sort((a, b) => a - b),
  );

  readonly hasFilters = computed(() => this.doseFilter() !== 'all' || this.ageFilter() !== 'all');

  readonly groups = computed<VaccineGroup[]>(() => {
    const term = this.search().trim().toLowerCase();
    const dose = this.doseFilter();
    const range =
      AGE_RANGE_FILTERS.find((f) => f.value === this.ageFilter()) ?? AGE_RANGE_FILTERS[0];

    const filtered = this.vaccineService
      .all()
      .filter(
        (v) => v.name.toLowerCase().includes(term) || v.description.toLowerCase().includes(term),
      )
      .filter((v) => dose === 'all' || v.totalDoses === Number(dose))
      .filter(
        (v) => v.recommendedAgeInMonths >= range.min && v.recommendedAgeInMonths <= range.max,
      );

    const map = new Map<number, VaccineGroup>();
    for (const vaccine of filtered) {
      const age = vaccine.recommendedAgeInMonths;
      if (!map.has(age)) {
        map.set(age, { label: ageGroupLabel(age), ageMonths: age, vaccines: [] });
      }
      map.get(age)!.vaccines.push(vaccine);
    }
    return [...map.values()].sort((a, b) => a.ageMonths - b.ageMonths);
  });

  onSearch(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
  }

  onDoseFilter(event: Event): void {
    this.doseFilter.set((event.target as HTMLSelectElement).value);
  }

  onAgeFilter(event: Event): void {
    this.ageFilter.set((event.target as HTMLSelectElement).value);
  }
}

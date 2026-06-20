import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonIcon, IonItem } from '@ionic/angular/standalone';
import { VaccinationRecord } from 'src/app/shared/models/vaccination-record.model';
import { VaccineService } from 'src/app/core/services/vaccine.service';
import { StatusBadge } from 'src/app/shared/components/status-badge/status-badge';
import { EmptyState } from 'src/app/shared/components/empty-state/empty-state';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
import { ageGroupLabel } from 'src/app/core/utils/age.util';
import { daysOverdue } from 'src/app/core/utils/date.util';
import { statusVisual } from 'src/app/core/utils/status.util';
import { VaccinationStatus } from 'src/app/shared/models/vaccination-status.model';

type Filter = 'all' | 'pending' | 'overdue' | 'applied';

interface TimelineGroup {
  label: string;
  ageMonths: number;
  records: VaccinationRecord[];
}

@Component({
  selector: 'app-vaccine-timeline',
  imports: [NgTemplateOutlet, RouterLink, IonItem, StatusBadge, EmptyState, IonIcon, DateFormatPipe],
  templateUrl: './vaccine-timeline.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VaccineTimeline {
  private readonly vaccineService = inject(VaccineService);

  readonly records = input.required<VaccinationRecord[]>();
  readonly register = output<VaccinationRecord>();

  readonly filter = signal<Filter>('all');

  readonly filters = computed(() => {
    const recs = this.records();
    const count = (pred: (r: VaccinationRecord) => boolean) => recs.filter(pred).length;
    return [
      { key: 'all' as Filter, label: 'Todas', count: recs.length },
      {
        key: 'pending' as Filter,
        label: 'Pendentes',
        count: count((r) => r.status === 'pending'),
      },
      { key: 'overdue' as Filter, label: 'Atrasadas', count: count((r) => r.status === 'overdue') },
      { key: 'applied' as Filter, label: 'Aplicadas', count: count((r) => r.status === 'applied') },
    ];
  });

  private readonly filtered = computed(() => {
    const f = this.filter();
    return this.records().filter((r) => {
      if (f === 'all') return true;
      if (f === 'pending') return r.status === 'pending';
      return r.status === f;
    });
  });

  readonly groups = computed<TimelineGroup[]>(() => {
    const map = new Map<number, TimelineGroup>();
    for (const record of this.filtered()) {
      const age = this.vaccineService.getById(record.vaccineId)?.recommendedAgeInMonths ?? 0;
      if (!map.has(age)) {
        map.set(age, { label: ageGroupLabel(age), ageMonths: age, records: [] });
      }
      map.get(age)!.records.push(record);
    }
    return [...map.values()].sort((a, b) => a.ageMonths - b.ageMonths);
  });

  setFilter(filter: Filter): void {
    this.filter.set(filter);
  }

  vaccineName(vaccineId: string): string {
    return this.vaccineService.getById(vaccineId)?.name ?? vaccineId;
  }

  borderClass(status: VaccinationStatus): string {
    return statusVisual(status).borderClass;
  }

  icon(status: VaccinationStatus) {
    return statusVisual(status).icon;
  }

  iconColor(status: VaccinationStatus): string {
    return statusVisual(status).iconColor;
  }

  daysLate(iso: string): number {
    return daysOverdue(iso);
  }
}

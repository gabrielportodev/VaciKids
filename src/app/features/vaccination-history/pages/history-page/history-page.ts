import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { IonIcon, IonItem } from '@ionic/angular/standalone';
import { ChildService } from 'src/app/core/services/child.service';
import { VaccinationRecordService } from 'src/app/core/services/vaccination-record.service';
import { VaccinationRecord } from 'src/app/shared/models/vaccination-record.model';
import { EmptyState } from 'src/app/shared/components/empty-state/empty-state';
import { Loading } from 'src/app/shared/components/loading/loading';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
import { VaccineNamePipe } from 'src/app/shared/pipes/vaccine-name.pipe';

interface HistoryGroup {
  childId: string;
  childName: string;
  records: VaccinationRecord[];
}

@Component({
  selector: 'app-history-page',
  imports: [IonItem, EmptyState, Loading, IonIcon, DateFormatPipe, VaccineNamePipe],
  templateUrl: './history-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryPage {
  private readonly childService = inject(ChildService);
  private readonly recordService = inject(VaccinationRecordService);

  readonly loading = this.recordService.loading;

  readonly groups = computed<HistoryGroup[]>(() => {
    const applied = this.recordService
      .all()
      .filter((record) => record.status === 'applied')
      .sort((a, b) => (b.applicationDate ?? '').localeCompare(a.applicationDate ?? ''));

    const map = new Map<string, HistoryGroup>();
    for (const record of applied) {
      if (!map.has(record.childId)) {
        map.set(record.childId, {
          childId: record.childId,
          childName: this.childService.getById(record.childId)?.name ?? record.childId,
          records: [],
        });
      }
      map.get(record.childId)!.records.push(record);
    }
    return [...map.values()];
  });
}

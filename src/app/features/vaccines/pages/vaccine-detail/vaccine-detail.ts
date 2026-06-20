import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { IonCard, IonCardContent } from '@ionic/angular/standalone';
import { VaccineService } from 'src/app/core/services/vaccine.service';
import { DetailHeader } from 'src/app/shared/components/detail-header/detail-header';
import { Icon } from 'src/app/shared/components/icon/icon';
import { ageGroupLabel } from 'src/app/core/utils/age.util';

const ADMINISTRATION_ROUTE: Record<string, string> = {
  bcg: 'Intradérmica',
  'hepatite-b': 'Intramuscular',
  penta: 'Intramuscular',
  vip: 'Intramuscular',
  pneumo10: 'Intramuscular',
  rotavirus: 'Oral',
  'meningo-c': 'Intramuscular',
  'febre-amarela': 'Subcutânea',
  'triplice-viral': 'Subcutânea',
};

@Component({
  selector: 'app-vaccine-detail',
  imports: [IonCard, IonCardContent, DetailHeader, Icon],
  templateUrl: './vaccine-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VaccineDetail {
  private readonly vaccineService = inject(VaccineService);

  readonly id = input.required<string>();
  readonly vaccine = computed(() => this.vaccineService.getById(this.id()));
  readonly ageLabel = computed(() => {
    const v = this.vaccine();
    return v ? ageGroupLabel(v.recommendedAgeInMonths) : '';
  });
  readonly route = computed(() => ADMINISTRATION_ROUTE[this.id()] ?? 'Intramuscular');
}

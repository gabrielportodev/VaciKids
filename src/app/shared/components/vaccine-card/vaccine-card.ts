import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonItem } from '@ionic/angular/standalone';
import { Vaccine } from 'src/app/shared/models/vaccine.model';
import { Icon } from 'src/app/shared/components/icon/icon';
import { ageGroupLabel } from 'src/app/core/utils/age.util';

@Component({
  selector: 'app-vaccine-card',
  imports: [RouterLink, IonItem, Icon],
  templateUrl: './vaccine-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VaccineCard {
  readonly vaccine = input.required<Vaccine>();

  readonly ageLabel = computed(() => ageGroupLabel(this.vaccine().recommendedAgeInMonths));
}

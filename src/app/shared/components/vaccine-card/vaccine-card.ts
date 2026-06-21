import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonIcon, IonItem } from '@ionic/angular/standalone';
import { Vaccine } from 'src/app/shared/models/vaccine.model';
import { ageGroupLabel } from 'src/app/core/utils';

@Component({
  selector: 'app-vaccine-card',
  imports: [RouterLink, IonItem, IonIcon],
  templateUrl: './vaccine-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VaccineCard {
  readonly vaccine = input.required<Vaccine>();

  readonly ageLabel = computed(() => ageGroupLabel(this.vaccine().recommendedAgesInMonths[0]));
}

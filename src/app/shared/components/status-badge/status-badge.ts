import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IonIcon, IonBadge } from '@ionic/angular/standalone';
import { VaccinationStatus } from 'src/app/shared/models/vaccination-status.model';
import { statusVisual } from 'src/app/core/utils';

@Component({
  selector: 'app-status-badge',
  imports: [IonBadge, IonIcon],
  templateUrl: './status-badge.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBadge {
  readonly status = input.required<VaccinationStatus>();

  private readonly visual = computed(() => statusVisual(this.status()));

  readonly label = computed(() => this.visual().label);
  readonly classes = computed(() => this.visual().badgeClasses);
  readonly icon = computed(() => this.visual().icon);
  readonly iconColor = computed(() => this.visual().iconColor);
}

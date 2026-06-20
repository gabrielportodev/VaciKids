import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IonBadge } from '@ionic/angular/standalone';
import { VaccinationStatus } from 'src/app/shared/models/vaccination-status.model';
import {
  statusBadgeClasses,
  statusIcon,
  statusIconColor,
  statusLabel,
} from 'src/app/core/utils/status.util';
import { Icon } from 'src/app/shared/components/icon/icon';

@Component({
  selector: 'app-status-badge',
  imports: [IonBadge, Icon],
  templateUrl: './status-badge.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBadge {
  readonly status = input.required<VaccinationStatus>();

  readonly label = computed(() => statusLabel(this.status()));
  readonly classes = computed(() => statusBadgeClasses(this.status()));
  readonly icon = computed(() => statusIcon(this.status()));
  readonly iconColor = computed(() => statusIconColor(this.status()));
}

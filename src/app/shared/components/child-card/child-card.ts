import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonAvatar, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { Child } from 'src/app/shared/models/child.model';
import { AgePipe } from 'src/app/shared/pipes/age.pipe';
import { Icon } from 'src/app/shared/components/icon/icon';
import { getInitials } from 'src/app/core/utils/name.util';

export interface ChildSummary {
  applied: number;
  pending: number;
  overdue: number;
  total: number;
  appliedPercent: number;
  overduePercent: number;
}

@Component({
  selector: 'app-child-card',
  imports: [RouterLink, IonCard, IonCardContent, IonAvatar, AgePipe, Icon],
  templateUrl: './child-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildCard {
  readonly child = input.required<Child>();
  readonly summary = input<ChildSummary>({
    applied: 0,
    pending: 0,
    overdue: 0,
    total: 0,
    appliedPercent: 0,
    overduePercent: 0,
  });

  readonly initials = computed(() => getInitials(this.child().name));
}

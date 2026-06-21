import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonIcon, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { Child } from 'src/app/shared/models/child.model';
import { ChildSummary } from 'src/app/shared/models/child-summary.model';
import { AgePipe } from 'src/app/shared/pipes/age.pipe';
import { ChildAvatar } from 'src/app/shared/components/child-avatar/child-avatar';

@Component({
  selector: 'app-child-card',
  imports: [RouterLink, IonCard, IonCardContent, ChildAvatar, AgePipe, IonIcon],
  templateUrl: './child-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildCard {
  readonly child = input.required<Child>();
  readonly summary = input.required<ChildSummary>();
}

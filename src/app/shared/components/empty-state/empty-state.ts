import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IonCard, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { IconName } from 'src/app/shared/icons';

@Component({
  selector: 'app-empty-state',
  imports: [IonCard, IonCardContent, IonIcon],
  templateUrl: './empty-state.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyState {
  readonly icon = input<IconName>('inbox');
  readonly title = input.required<string>();
  readonly description = input<string>('');
}

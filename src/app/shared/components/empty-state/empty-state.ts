import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IonCard, IonCardContent } from '@ionic/angular/standalone';
import { Icon, IconName } from 'src/app/shared/components/icon/icon';

@Component({
  selector: 'app-empty-state',
  imports: [IonCard, IonCardContent, Icon],
  templateUrl: './empty-state.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyState {
  readonly icon = input<IconName>('inbox');
  readonly title = input.required<string>();
  readonly description = input<string>('');
}

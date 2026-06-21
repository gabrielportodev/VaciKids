import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IonSpinner } from '@ionic/angular/standalone';

@Component({
  selector: 'app-loading',
  imports: [IonSpinner],
  templateUrl: './loading.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Loading {
  readonly label = input<string>('');
  readonly inline = input(false, { transform: booleanAttribute });
}

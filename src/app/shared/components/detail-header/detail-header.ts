import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-detail-header',
  imports: [RouterLink, IonIcon],
  templateUrl: './detail-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailHeader {
  readonly title = input.required<string>();
  readonly backLink = input.required<string>();
}

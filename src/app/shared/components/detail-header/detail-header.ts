import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from 'src/app/shared/components/icon/icon';

@Component({
  selector: 'app-detail-header',
  imports: [RouterLink, Icon],
  templateUrl: './detail-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailHeader {
  readonly title = input.required<string>();
  readonly backLink = input.required<string>();
}

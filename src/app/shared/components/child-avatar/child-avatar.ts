import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { getInitials } from 'src/app/core/utils';

type AvatarSize = 'md' | 'lg';

const SIZE_CLASSES: Record<AvatarSize, string> = {
  md: 'h-12 w-12 text-base',
  lg: 'h-14 w-14 text-lg',
};

@Component({
  selector: 'app-child-avatar',
  imports: [],
  templateUrl: './child-avatar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildAvatar {
  readonly name = input.required<string>();
  readonly photoUrl = input<string>();
  readonly size = input<AvatarSize>('md');

  readonly sizeClasses = computed(() => SIZE_CLASSES[this.size()]);
  readonly initials = computed(() => getInitials(this.name()));
}

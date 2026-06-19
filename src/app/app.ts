import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Icon, IconName } from 'src/app/shared/components/icon/icon';

interface NavItem {
  label: string;
  path: string;
  icon: IconName;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Icon],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly tabs: NavItem[] = [
    { label: 'Início', path: '/dashboard', icon: 'dashboard' },
    { label: 'Crianças', path: '/children', icon: 'users' },
    { label: 'Vacinas', path: '/vaccines', icon: 'syringe' },
    { label: 'Campanhas', path: '/campaigns', icon: 'megaphone' },
  ];

  protected readonly navItems: NavItem[] = [
    ...this.tabs,
    { label: 'Histórico', path: '/history', icon: 'history' },
  ];
}

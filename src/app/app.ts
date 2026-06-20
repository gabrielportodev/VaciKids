import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { IconName } from 'src/app/shared/icons';

interface NavItem {
  label: string;
  path: string;
  icon: IconName;
}

type SidebarState = 'open' | 'collapsed' | 'closed';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, IonIcon],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly navItems: NavItem[] = [
    { label: 'Início', path: '/dashboard', icon: 'dashboard' },
    { label: 'Crianças', path: '/children', icon: 'users' },
    { label: 'Vacinas', path: '/vaccines', icon: 'syringe' },
    { label: 'Campanhas', path: '/campaigns', icon: 'megaphone' },
    { label: 'Histórico', path: '/history', icon: 'history' },
  ];

  protected readonly sidebarState = signal<SidebarState>('open');
  protected readonly mobileMenuOpen = signal(false);

  protected readonly showLabels = computed(
    () => this.mobileMenuOpen() || this.sidebarState() === 'open',
  );
  protected readonly showNav = computed(
    () => this.mobileMenuOpen() || this.sidebarState() !== 'closed',
  );
  protected readonly iconOnly = computed(() => this.showNav() && !this.showLabels());

  protected readonly asideClasses = computed(() => {
    const translate = this.mobileMenuOpen() ? 'translate-x-0' : '-translate-x-full';
    const width =
      this.sidebarState() === 'open'
        ? 'md:w-60'
        : this.sidebarState() === 'collapsed'
          ? 'md:w-20'
          : 'md:w-16';
    return `${translate} md:translate-x-0 ${width}`;
  });

  protected toggleCollapse(): void {
    this.sidebarState.update((state) => (state === 'collapsed' ? 'open' : 'collapsed'));
  }

  protected openSidebar(): void {
    this.sidebarState.set('open');
  }

  protected handleClose(): void {
    if (this.mobileMenuOpen()) {
      this.mobileMenuOpen.set(false);
    } else {
      this.sidebarState.set('closed');
    }
  }

  protected openMobileMenu(): void {
    this.mobileMenuOpen.set(true);
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}

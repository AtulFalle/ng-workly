import { Component, signal, inject, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// PrimeNG Components
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { PopoverModule } from 'primeng/popover';

// import { ColorPaletteService } from '@workly/theming/color-palette.service';

export interface HeaderMenuItem {
  label: string;
  icon?: string;
  routerLink?: string;
  command?: () => void;
  items?: HeaderMenuItem[];
  badge?: string;
  badgeClass?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

@Component({
  selector: 'lib-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ToolbarModule,
    ButtonModule,
    MenubarModule,
    AvatarModule,
    BadgeModule,
    MenuModule,
    InputTextModule,
    DividerModule,
    PopoverModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  // private colorPaletteService = inject(ColorPaletteService);

  // Inputs using input() function
  title = input<string>('Application');
  logo = input<string>();
  menuItems = input<HeaderMenuItem[]>([]);
  userProfile = input<UserProfile>();
  showSearch = input<boolean>(true);
  showNotifications = input<boolean>(true);
  showUserMenu = input<boolean>(true);
  showColorPalette = input<boolean>(true);
  sticky = input<boolean>(true);

  // Outputs using output() function
  menuClick = output<HeaderMenuItem>();
  userMenuClick = output<string>();
  searchChange = output<string>();
  notificationClick = output<void>();

  // Component state using signals
  searchQuery = signal('');
  isUserMenuOpen = signal(false);
  isColorPaletteOpen = signal(false);
  notificationCount = signal(0);

  // Computed properties
  userMenuItems = computed(() => [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => this.handleUserMenuClick('profile')
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      command: () => this.handleUserMenuClick('settings')
    },
    {
      separator: true
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.handleUserMenuClick('logout')
    }
  ]);

  // Color palette options
  colorOptions = computed(() => [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f97316' }
  ]);

  // Computed user initials
  userInitials = computed(() => {
    const profile = this.userProfile();
    if (!profile?.name) return '';
    return this.getInitials(profile.name);
  });

  onSearchChange(): void {
    this.searchChange.emit(this.searchQuery());
  }

  onMenuClick(item: HeaderMenuItem): void {
    this.menuClick.emit(item);
  }

  onNotificationClick(): void {
    this.notificationClick.emit();
  }

  handleUserMenuClick(action: string): void {
    this.userMenuClick.emit(action);
    this.isUserMenuOpen.set(false);
  }

  onColorSelect(color: string): void {
    // this.colorPaletteService.selectColor(color);
    this.isColorPaletteOpen.set(false);
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen.update(open => !open);
  }

  toggleColorPalette(): void {
    this.isColorPaletteOpen.update(open => !open);
  }

  private getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}

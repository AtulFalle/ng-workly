import { Component, signal, input, output, computed, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../design-system/button/button.component';
import { InputComponent } from '../../design-system/input/input.component';
import { UserCardComponent } from '../user-card/user-card.component';

export interface SidebarMenuItem {
  label: string;
  icon?: string;
  routerLink?: string;
  command?: () => void;
  items?: SidebarMenuItem[];
  badge?: string;
  badgeClass?: string;
  separator?: boolean;
  visible?: boolean;
  disabled?: boolean;
}

export interface SidebarSection {
  title?: string;
  items: SidebarMenuItem[];
  visible?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

@Component({
  selector: 'lib-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ButtonComponent,
    UserCardComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  private router = inject(Router);

  // Inputs using input() function
  sections = input<SidebarSection[]>([]);
  userProfile = input<UserProfile>();
  logo = input<string>();
  logoText = input<string>('Workly');
  showUserProfile = input<boolean>(false);
  showSearch = input<boolean>(false);
  showLogo = input<boolean>(false);
  collapsed = input<boolean>(false);
  width = input<string>('280px');
  collapsedWidth = input<string>('60px');
  theme = input<'light' | 'dark'>('light');
  position = input<'left' | 'right'>('left');

  // Outputs using output() function
  menuClick = output<SidebarMenuItem>();
  userMenuClick = output<string>();
  searchChange = output<string>();
  toggleCollapse = output<boolean>();
  sectionToggle = output<SidebarSection>();

  // Component state using signals
  searchQuery = signal('');
  isUserMenuOpen = signal(false);
  expandedSections = signal<Set<string>>(new Set());
  activeMenuItem = signal<string>('');

  // Computed properties
  displaySections = computed(() => {
    const sections = this.sections();
    return sections.length > 0 ? sections : this.defaultSections;
  });

  userMenuItems = computed(() => [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => this.onUserMenuClick('profile')
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      command: () => this.onUserMenuClick('settings')
    },
    {
      separator: true
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.onUserMenuClick('logout')
    }
  ]);

  // Computed user initials
  userInitials = computed(() => {
    const profile = this.userProfile();
    if (!profile?.name) return '';
    return this.getInitials(profile.name);
  });

  // Default sections if none provided
  private defaultSections: SidebarSection[] = [
    {
      title: 'Main',
      items: [
        {
          label: 'Dashboard',
          icon: 'pi pi-home',
          routerLink: '/dashboard'
        },
        {
          label: 'Analytics',
          icon: 'pi pi-chart-bar',
          routerLink: '/analytics'
        },
        {
          label: 'Projects',
          icon: 'pi pi-folder',
          routerLink: '/projects'
        }
      ]
    },
    {
      title: 'Management',
      items: [
        {
          label: 'Users',
          icon: 'pi pi-users',
          routerLink: '/users'
        },
        {
          label: 'Settings',
          icon: 'pi pi-cog',
          routerLink: '/settings'
        }
      ]
    }
  ];

  onMenuClick(item: SidebarMenuItem): void {
    if (item.disabled) return;
    
    if (item.command) {
      item.command();
    }
    
    if (item.routerLink) {
      this.router.navigate([item.routerLink]);
    }
    
    this.menuClick.emit(item);
    this.activeMenuItem.set(item.routerLink || item.label);
  }

  onUserMenuClick(action: string): void {
    this.userMenuClick.emit(action);
    this.isUserMenuOpen.set(false);
    
    // Handle navigation if needed
    if (action === 'profile') {
      this.router.navigate(['/profile']);
    } else if (action === 'settings') {
      this.router.navigate(['/settings']);
    }
  }

  onSearchChange(): void {
    this.searchChange.emit(this.searchQuery());
  }

  onToggleCollapse(): void {
    const newCollapsed = !this.collapsed();
    this.toggleCollapse.emit(newCollapsed);
  }

  onSectionToggle(section: SidebarSection): void {
    const title = section.title || '';
    const expanded = this.expandedSections();
    const newExpanded = new Set(expanded);
    
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    
    this.expandedSections.set(newExpanded);
    this.sectionToggle.emit(section);
  }

  isSectionExpanded(section: SidebarSection): boolean {
    const title = section.title || '';
    return this.expandedSections().has(title);
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen.update(open => !open);
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

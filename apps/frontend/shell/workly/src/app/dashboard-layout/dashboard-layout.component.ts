import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemingService, Theme } from '@workly/theming';
import { ColorPaletteService } from '@workly/theming/color-palette.service';

// Shared UI Components
import { 
  HeaderComponent, 
  FooterComponent, 
  SidebarComponent,
  HeaderMenuItem, 
  UserProfile, 
  FooterSection, 
  SocialLink,
  SidebarMenuItem,
  SidebarSection
} from '@workly/ui-component';

// PrimeNG Components
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardLayoutComponent {
  protected title = 'Workly Dashboard';
  
  themingService = inject(ThemingService);
  colorPaletteService = inject(ColorPaletteService);
  messageService = inject(MessageService);
  
  availableThemes: Theme[] = this.themingService.availableThemes;
  currentTheme = this.themingService.currentTheme;
  selectedTheme = signal<Theme>(this.themingService.getCurrentTheme());
  
  // Sidebar state
  isSidebarCollapsed = signal(false);
  
  // Header configuration
  headerMenuItems = signal<HeaderMenuItem[]>([
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/dashboard'
    },
    {
      label: 'Analytics',
      icon: 'pi pi-chart-bar',
      routerLink: '/dashboard/analytics'
    },
    {
      label: 'Projects',
      icon: 'pi pi-folder',
      routerLink: '/dashboard/projects'
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      routerLink: '/dashboard/settings'
    }
  ]);

  userProfile = signal<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@workly.com',
    role: 'Administrator',
    avatar: 'https://via.placeholder.com/40'
  });

  // Sidebar configuration
  sidebarSections = signal<SidebarSection[]>([
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
          routerLink: '/dashboard/analytics'
        },
        {
          label: 'Projects',
          icon: 'pi pi-folder',
          routerLink: '/dashboard/projects',
          badge: '3',
          badgeClass: 'info'
        }
      ]
    },
    {
      title: 'Management',
      items: [
        {
          label: 'Users',
          icon: 'pi pi-users',
          routerLink: '/dashboard/users'
        },
        {
          label: 'Teams',
          icon: 'pi pi-users',
          routerLink: '/dashboard/teams'
        },
        {
          label: 'Settings',
          icon: 'pi pi-cog',
          routerLink: '/dashboard/settings'
        }
      ]
    },
    {
      title: 'Tools',
      items: [
        {
          label: 'Reports',
          icon: 'pi pi-file-pdf',
          routerLink: '/dashboard/reports'
        },
        {
          label: 'Integrations',
          icon: 'pi pi-link',
          routerLink: '/dashboard/integrations'
        },
        {
          label: 'API Keys',
          icon: 'pi pi-key',
          routerLink: '/dashboard/api-keys'
        }
      ]
    }
  ]);

  // Footer configuration
  footerSections = signal<FooterSection[]>([
    {
      title: 'Product',
      links: [
        { label: 'Features', url: '/features' },
        { label: 'Pricing', url: '/pricing' },
        { label: 'Documentation', url: '/docs' },
        { label: 'API', url: '/api' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', url: '/about' },
        { label: 'Blog', url: '/blog' },
        { label: 'Careers', url: '/careers' },
        { label: 'Contact', url: '/contact' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', url: '/help' },
        { label: 'Community', url: '/community' },
        { label: 'Status', url: '/status' },
        { label: 'Security', url: '/security' }
      ]
    }
  ]);

  socialLinks = signal<SocialLink[]>([
    { name: 'GitHub', icon: 'pi pi-github', url: 'https://github.com/workly', color: '#333' },
    { name: 'Twitter', icon: 'pi pi-twitter', url: 'https://twitter.com/workly', color: '#1da1f2' },
    { name: 'LinkedIn', icon: 'pi pi-linkedin', url: 'https://linkedin.com/company/workly', color: '#0077b5' },
    { name: 'Discord', icon: 'pi pi-discord', url: 'https://discord.gg/workly', color: '#5865f2' }
  ]);
  
  setTheme(theme: Theme): void {
    this.themingService.setTheme(theme);
    this.selectedTheme.set(theme);
  }
  
  toggleTheme(): void {
    this.themingService.toggleTheme();
    this.selectedTheme.set(this.themingService.getCurrentTheme());
  }

  // Sidebar event handlers
  onSidebarToggleCollapse(collapsed: boolean): void {
    this.isSidebarCollapsed.set(collapsed);
    console.log('Sidebar collapsed:', collapsed);
  }

  onSidebarMenuClick(item: SidebarMenuItem): void {
    console.log('Sidebar menu clicked:', item);
    this.messageService.add({
      severity: 'info',
      summary: 'Navigation',
      detail: `Navigating to: ${item.label}`
    });
  }

  onSidebarSectionToggle(section: SidebarSection): void {
    console.log('Sidebar section toggled:', section);
  }

  // Header Event Handlers
  onHeaderMenuClick(item: HeaderMenuItem): void {
    console.log('Header menu clicked:', item);
    if (item.command) {
      item.command();
    }
  }

  onUserMenuClick(action: string): void {
    console.log('User menu action:', action);
    this.messageService.add({
      severity: 'info',
      summary: 'User Action',
      detail: `User selected: ${action}`
    });
  }

  onSearchChange(query: string): void {
    console.log('Search query:', query);
    this.messageService.add({
      severity: 'info',
      summary: 'Search',
      detail: `Searching for: ${query}`
    });
  }

  onNotificationClick(): void {
    console.log('Notification clicked');
    this.messageService.add({
      severity: 'info',
      summary: 'Notifications',
      detail: 'You have 3 new notifications'
    });
  }

  // Footer Event Handlers
  onFooterLinkClick(link: any): void {
    console.log('Footer link clicked:', link);
    this.messageService.add({
      severity: 'info',
      summary: 'Navigation',
      detail: `Navigating to: ${link.label}`
    });
  }

  onSocialClick(social: SocialLink): void {
    console.log('Social link clicked:', social);
    this.messageService.add({
      severity: 'info',
      summary: 'Social Media',
      detail: `Opening ${social.name}`
    });
  }

  onNewsletterSubscribe(email: string): void {
    console.log('Newsletter subscription:', email);
    this.messageService.add({
      severity: 'success',
      summary: 'Newsletter',
      detail: `Subscribed with: ${email}`
    });
  }

  onBackToTop(): void {
    console.log('Back to top clicked');
    this.messageService.add({
      severity: 'info',
      summary: 'Navigation',
      detail: 'Scrolling to top'
    });
  }
}

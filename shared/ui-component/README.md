# Shared UI Components Library

A comprehensive collection of reusable Angular components built with PrimeNG, following Angular best practices and modern patterns.

## Features

- 🎨 **Dynamic Theming**: Built-in color palette system with real-time theme switching
- 📱 **Responsive Design**: Mobile-first approach with adaptive layouts
- ♿ **Accessibility**: WCAG compliant components with keyboard navigation
- ⚡ **Performance**: Optimized with OnPush change detection and signals
- 🔧 **TypeScript**: Strict typing and modern Angular patterns
- 🎯 **PrimeNG Integration**: Seamless integration with PrimeNG components

## Components

### Header Component (`lib-header`)

A flexible header component with navigation, search, user menu, and theme controls.

```typescript
import { HeaderComponent, HeaderMenuItem, UserProfile } from '@workly/ui-component';

@Component({
  imports: [HeaderComponent],
  template: `
    <lib-header
      [title]="'My App'"
      [logo]="'/assets/logo.png'"
      [menuItems]="menuItems()"
      [userProfile]="userProfile()"
      [showSearch]="true"
      [showNotifications]="true"
      [showUserMenu]="true"
      [showColorPalette]="true"
      [sticky]="true"
      (menuClick)="onMenuClick($event)"
      (userMenuClick)="onUserMenuClick($event)"
      (searchChange)="onSearchChange($event)"
      (notificationClick)="onNotificationClick()">
    </lib-header>
  `
})
export class MyComponent {
  menuItems = signal<HeaderMenuItem[]>([
    { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
    { label: 'About', icon: 'pi pi-info', routerLink: '/about' }
  ]);

  userProfile = signal<UserProfile>({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Developer'
  });
}
```

### Footer Component (`lib-footer`)

A comprehensive footer component with links, social media, newsletter signup, and back-to-top functionality.

```typescript
import { FooterComponent, FooterSection, SocialLink } from '@workly/ui-component';

@Component({
  imports: [FooterComponent],
  template: `
    <lib-footer
      [companyName]="'My Company'"
      [description]="'Building amazing applications'"
      [sections]="footerSections()"
      [socialLinks]="socialLinks()"
      [showNewsletter]="true"
      [showSocialLinks]="true"
      [showBackToTop]="true"
      (linkClick)="onLinkClick($event)"
      (socialClick)="onSocialClick($event)"
      (newsletterSubscribe)="onNewsletterSubscribe($event)">
    </lib-footer>
  `
})
export class MyComponent {
  footerSections = signal<FooterSection[]>([
    {
      title: 'Product',
      links: [
        { label: 'Features', url: '/features' },
        { label: 'Pricing', url: '/pricing' }
      ]
    }
  ]);

  socialLinks = signal<SocialLink[]>([
    { name: 'GitHub', icon: 'pi pi-github', url: 'https://github.com' }
  ]);
}
```

## Configuration

### PrimeNG Configuration

The library provides centralized PrimeNG configuration:

```typescript
import { PRIME_NG_CONFIG, PRIME_NG_PROVIDERS } from '@workly/ui-component';

// In your app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    ...PRIME_NG_PROVIDERS,
    // other providers
  ]
};
```

### Design System Integration

The components integrate with the Workly design system:

```typescript
import { DESIGN_SYSTEM_CONFIG, DesignSystemUtils } from '@workly/ui-component';

// Access design system configuration
const primaryColor = DESIGN_SYSTEM_CONFIG.colors.primary;

// Use utility functions
const isDarkMode = DesignSystemUtils.isDarkMode();
DesignSystemUtils.toggleDarkMode();
```

## Styling

The components use CSS custom properties for theming and support both light and dark modes:

```scss
// Import the component styles
@import '@workly/ui-component/styles';

// Custom styling
.my-header {
  --header-bg: var(--primary-50);
  --header-text: var(--primary-800);
}
```

## Best Practices

### Component Usage

1. **Use Signals**: All components use Angular signals for reactive state management
2. **Native Control Flow**: Use `@if`, `@for`, `@switch` instead of structural directives
3. **Type Safety**: All components are fully typed with TypeScript interfaces
4. **Performance**: Components use `OnPush` change detection strategy
5. **Accessibility**: Components include proper ARIA attributes and keyboard navigation

### Example Implementation

```typescript
import { Component, signal, computed } from '@angular/core';
import { HeaderComponent, FooterComponent } from '@workly/ui-component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  template: `
    <lib-header
      [title]="appTitle()"
      [menuItems]="menuItems()"
      [userProfile]="userProfile()"
      (menuClick)="onMenuClick($event)">
    </lib-header>
    
    <main>
      <!-- Your content -->
    </main>
    
    <lib-footer
      [companyName]="companyName()"
      [sections]="footerSections()"
      (linkClick)="onFooterLinkClick($event)">
    </lib-footer>
  `
})
export class AppComponent {
  appTitle = signal('My Application');
  companyName = signal('My Company');
  
  menuItems = signal([
    { label: 'Home', routerLink: '/' },
    { label: 'About', routerLink: '/about' }
  ]);
  
  userProfile = signal({
    name: 'John Doe',
    email: 'john@example.com'
  });
  
  footerSections = signal([
    {
      title: 'Product',
      links: [
        { label: 'Features', url: '/features' },
        { label: 'Pricing', url: '/pricing' }
      ]
    }
  ]);
  
  onMenuClick(item: any): void {
    console.log('Menu clicked:', item);
  }
  
  onFooterLinkClick(link: any): void {
    console.log('Footer link clicked:', link);
  }
}
```

## Development

### Building the Library

```bash
nx build ui-component
```

### Testing

```bash
nx test ui-component
```

### Linting

```bash
nx lint ui-component
```

## Contributing

1. Follow Angular best practices
2. Use signals for state management
3. Implement proper TypeScript typing
4. Include comprehensive tests
5. Update documentation

## License

This library is part of the Workly project and follows the same licensing terms.
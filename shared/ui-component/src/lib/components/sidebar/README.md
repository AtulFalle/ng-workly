# Sidebar Component

A comprehensive sidebar navigation component inspired by Sakai-NG design patterns, built with Angular signals and PrimeNG components.

## Features

- **Collapsible Design**: Toggle between expanded and collapsed states
- **Section-based Navigation**: Organize menu items into logical sections
- **User Profile Integration**: Display user information with dropdown menu
- **Search Functionality**: Built-in search with real-time filtering
- **Responsive Design**: Mobile-friendly with overlay support
- **Dark Theme Support**: Complete dark mode implementation
- **Accessibility**: Keyboard navigation and screen reader support
- **Customizable**: Extensive theming and configuration options

## Usage

### Basic Implementation

```typescript
import { SidebarComponent, SidebarSection } from '@workly/ui-component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent],
  template: `
    <lib-sidebar
      [sections]="sidebarSections"
      [userProfile]="userProfile"
      [collapsed]="isCollapsed"
      (menuClick)="onMenuClick($event)"
      (toggleCollapse)="onToggleCollapse($event)"
    ></lib-sidebar>
  `
})
export class LayoutComponent {
  isCollapsed = signal(false);
  
  sidebarSections: SidebarSection[] = [
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
        }
      ]
    }
  ];
  
  userProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Administrator'
  };
  
  onMenuClick(item: SidebarMenuItem) {
    console.log('Menu clicked:', item);
  }
  
  onToggleCollapse(collapsed: boolean) {
    this.isCollapsed.set(collapsed);
  }
}
```

### Advanced Configuration

```typescript
// Custom sidebar with all options
<lib-sidebar
  [sections]="sidebarSections"
  [userProfile]="userProfile"
  [logo]="'/assets/logo.png'"
  [logoText]="'My App'"
  [showUserProfile]="true"
  [showSearch]="true"
  [showLogo]="true"
  [collapsed]="isCollapsed"
  [width]="'300px'"
  [collapsedWidth]="'70px'"
  [theme]="'dark'"
  [position]="'left'"
  (menuClick)="onMenuClick($event)"
  (userMenuClick)="onUserMenuClick($event)"
  (searchChange)="onSearchChange($event)"
  (toggleCollapse)="onToggleCollapse($event)"
  (sectionToggle)="onSectionToggle($event)"
></lib-sidebar>
```

## API Reference

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `sections` | `SidebarSection[]` | `[]` | Navigation sections with menu items |
| `userProfile` | `UserProfile` | `undefined` | User profile information |
| `logo` | `string` | `undefined` | Logo image URL |
| `logoText` | `string` | `'Workly'` | Logo text |
| `showUserProfile` | `boolean` | `true` | Show user profile section |
| `showSearch` | `boolean` | `true` | Show search input |
| `showLogo` | `boolean` | `true` | Show logo section |
| `collapsed` | `boolean` | `false` | Collapsed state |
| `width` | `string` | `'280px'` | Expanded width |
| `collapsedWidth` | `string` | `'60px'` | Collapsed width |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme variant |
| `position` | `'left' \| 'right'` | `'left'` | Sidebar position |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `menuClick` | `SidebarMenuItem` | Emitted when menu item is clicked |
| `userMenuClick` | `string` | Emitted when user menu action is clicked |
| `searchChange` | `string` | Emitted when search query changes |
| `toggleCollapse` | `boolean` | Emitted when collapse state changes |
| `sectionToggle` | `SidebarSection` | Emitted when section is toggled |

### Interfaces

#### SidebarMenuItem

```typescript
interface SidebarMenuItem {
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
```

#### SidebarSection

```typescript
interface SidebarSection {
  title?: string;
  items: SidebarMenuItem[];
  visible?: boolean;
}
```

#### UserProfile

```typescript
interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}
```

## Styling

The component uses CSS custom properties (design tokens) for consistent theming:

```scss
// Custom sidebar width
.sidebar-container {
  --sidebar-width: 320px;
  --sidebar-collapsed-width: 80px;
}

// Custom colors
.sidebar-container {
  --sidebar-bg: var(--surface-0);
  --sidebar-border: var(--surface-border);
  --sidebar-text: var(--text-color);
}
```

## Responsive Design

The sidebar automatically adapts to mobile screens:

- **Desktop**: Fixed sidebar with toggle functionality
- **Mobile**: Overlay sidebar with backdrop
- **Tablet**: Collapsible sidebar with touch-friendly controls

## Accessibility

- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators and logical tab order
- **Color Contrast**: WCAG AA compliant color combinations

## Examples

### Dashboard Sidebar

```typescript
const dashboardSections: SidebarSection[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/dashboard' },
      { label: 'Analytics', icon: 'pi pi-chart-bar', routerLink: '/analytics' }
    ]
  },
  {
    title: 'Management',
    items: [
      { label: 'Users', icon: 'pi pi-users', routerLink: '/users' },
      { label: 'Settings', icon: 'pi pi-cog', routerLink: '/settings' }
    ]
  }
];
```

### E-commerce Sidebar

```typescript
const ecommerceSections: SidebarSection[] = [
  {
    title: 'Sales',
    items: [
      { label: 'Orders', icon: 'pi pi-shopping-cart', routerLink: '/orders', badge: '5' },
      { label: 'Products', icon: 'pi pi-box', routerLink: '/products' },
      { label: 'Customers', icon: 'pi pi-users', routerLink: '/customers' }
    ]
  },
  {
    title: 'Reports',
    items: [
      { label: 'Sales Report', icon: 'pi pi-chart-line', routerLink: '/reports/sales' },
      { label: 'Inventory', icon: 'pi pi-warehouse', routerLink: '/reports/inventory' }
    ]
  }
];
```

## Best Practices

1. **Keep sections logical**: Group related menu items together
2. **Use consistent icons**: Stick to PrimeIcons for consistency
3. **Limit menu depth**: Avoid more than 2 levels of nesting
4. **Provide clear labels**: Use descriptive text for menu items
5. **Handle loading states**: Show loading indicators for async operations
6. **Test accessibility**: Ensure keyboard navigation works properly

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Dependencies

- Angular 17+
- PrimeNG 17+
- PrimeIcons
- RxJS (for signals)

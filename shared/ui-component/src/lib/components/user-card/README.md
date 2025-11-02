# User Card Component

A flexible and reusable user card component for displaying user information with avatar, name, and additional details. Perfect for HRM applications with multiple variants optimized for different use cases.

## Features

- 🎨 **Multiple Variants**: Default, Header, Table, Compact, and Detailed variants
- 👤 **Avatar Support**: Image avatars with automatic initials fallback
- 📱 **Responsive Design**: Adapts to different screen sizes
- 🎯 **HRM Optimized**: Specialized variants for navigation headers and employee tables
- 🌙 **Dark Theme Support**: Automatic dark theme styling
- ♿ **Accessible**: Proper ARIA labels and keyboard navigation
- 🎨 **Design Tokens**: Uses Workly design system tokens for consistent styling

## Usage

### Basic Example

```typescript
import { UserCardComponent } from '@workly/ui-component';

@Component({
  imports: [UserCardComponent],
  template: `
    <lib-user-card
      [user]="{
        name: 'John Doe',
        subtitle: 'Senior Developer',
        avatar: '/assets/users/john.jpg'
      }"
      variant="default"
      size="medium">
    </lib-user-card>
  `
})
export class MyComponent {}
```

### Navigation Header Variant

Perfect for displaying user information in navigation headers:

```typescript
<lib-user-card
  [user]="{
    name: 'Jane Smith',
    subtitle: 'HR Manager',
    avatar: '/assets/users/jane.jpg'
  }"
  variant="header"
  avatarPosition="left"
  [clickable]="true"
  routerLink="/profile">
</lib-user-card>
```

### Employee Table Variant

Optimized for displaying employees in table rows:

```typescript
<lib-user-card
  [user]="{
    name: 'Michael Johnson',
    subtitle: 'Software Engineer',
    employeeId: 'EMP-001',
    status: 'active'
  }"
  variant="table"
  size="small"
  [showStatus]="true"
  badge="3"
  badgeSeverity="info">
</lib-user-card>
```

### Detailed Variant

Shows comprehensive user information:

```typescript
<lib-user-card
  [user]="{
    name: 'Robert Brown',
    subtitle: 'Team Lead',
    avatar: '/assets/users/robert.jpg',
    role: 'Engineering Team Lead',
    email: 'robert.brown@company.com',
    department: 'Engineering',
    employeeId: 'EMP-002',
    status: 'active'
  }"
  variant="detailed"
  size="medium"
  [showRole]="true"
  [showEmail]="true"
  [showDepartment]="true"
  [showEmployeeId]="true"
  [showStatus]="true"
  [hoverable]="true"
  [bordered]="true">
</lib-user-card>
```

### With Initials (No Avatar)

Automatically displays user initials when no avatar is provided:

```typescript
<lib-user-card
  [user]="{
    name: 'David Wilson',
    subtitle: 'Marketing Director'
    // No avatar - will show 'DW' initials
  }"
  variant="default"
  size="medium">
</lib-user-card>
```

### With Avatar on Right

```typescript
<lib-user-card
  [user]="{
    name: 'Emily Davis',
    subtitle: 'Product Manager',
    avatar: '/assets/users/emily.jpg'
  }"
  variant="default"
  avatarPosition="right">
</lib-user-card>
```

## Variants

### `default`
Standard card layout with avatar and user information. Best for general user display.

### `header`
Compact layout optimized for navigation headers. Smaller padding and spacing.

### `table`
Minimal layout for table rows. Compact spacing and smaller font sizes.

### `compact`
Minimal spacing variant for tight layouts.

### `detailed`
Comprehensive layout showing role, email, department, employee ID, and status. Includes icons and structured information sections.

## Props

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `user` | `UserCardData` | **required** | User data object |
| `variant` | `UserCardVariant` | `'default'` | Card variant style |
| `size` | `UserCardSize` | `'medium'` | Card size |
| `avatarPosition` | `'left' \| 'right'` | `'left'` | Avatar position |
| `showRole` | `boolean` | `false` | Show user role (auto-enabled in detailed variant) |
| `showEmail` | `boolean` | `false` | Show user email (auto-enabled in detailed variant) |
| `showDepartment` | `boolean` | `false` | Show department (auto-enabled in detailed variant) |
| `showEmployeeId` | `boolean` | `false` | Show employee ID (auto-enabled in detailed variant) |
| `showStatus` | `boolean` | `false` | Show status badge (auto-enabled in detailed variant) |
| `clickable` | `boolean` | `false` | Make card clickable |
| `bordered` | `boolean` | `false` | Add border to card |
| `hoverable` | `boolean` | `false` | Enable hover effects |
| `routerLink` | `string` | `undefined` | Router link for navigation |
| `badge` | `string` | `undefined` | Badge text to display |
| `badgeSeverity` | `'success' \| 'warning' \| 'danger' \| 'info'` | `'success'` | Badge severity color |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `cardClick` | `UserCardData` | Emitted when card is clicked |
| `avatarClick` | `UserCardData` | Emitted when avatar is clicked |

## UserCardData Interface

```typescript
interface UserCardData {
  name: string;              // Required: User's full name
  subtitle?: string;         // Optional: Subtitle text (e.g., job title)
  avatar?: string;           // Optional: Avatar image URL
  role?: string;             // Optional: User's role
  email?: string;            // Optional: User's email address
  department?: string;       // Optional: Department name
  employeeId?: string;       // Optional: Employee ID
  status?: 'active' | 'inactive' | 'on-leave' | 'pending';  // Optional: User status
  initials?: string;         // Optional: Custom initials (auto-generated if not provided)
}
```

## Sizes

- **`small`**: Compact size with smaller fonts and avatar (24-32px)
- **`medium`**: Default size (36-48px avatar)
- **`large`**: Larger size with bigger fonts and avatar (64px)

## Avatar Sizes by Variant

| Variant | Small | Medium | Large |
|---------|-------|--------|-------|
| `default` | 32px | 48px | 64px |
| `header` | 32px | 36px | 40px |
| `table` | 24px | 32px | 40px |
| `compact` | 32px | 48px | 64px |
| `detailed` | 32px | 48px | 64px |

## Status Types

The component supports four status types with color-coded badges:

- **`active`**: Green badge - User is active
- **`inactive`**: Red badge - User is inactive
- **`on-leave`**: Yellow badge - User is on leave
- **`pending`**: Blue badge - User status is pending

## HRM Use Cases

### 1. Navigation Header

Display current user in the navigation header:

```typescript
<lib-user-card
  [user]="currentUser()"
  variant="header"
  [clickable]="true"
  routerLink="/profile"
  (cardClick)="openUserMenu()">
</lib-user-card>
```

### 2. Employee List Table

Display employees in a table:

```typescript
@for (employee of employees(); track employee.employeeId) {
  <tr>
    <td>
      <lib-user-card
        [user]="employee"
        variant="table"
        size="small"
        [showStatus]="true"
        [showEmployeeId]="true"
        (cardClick)="viewEmployee(employee)">
      </lib-user-card>
    </td>
  </tr>
}
```

### 3. Employee Profile Card

Show detailed employee information:

```typescript
<lib-user-card
  [user]="employee()"
  variant="detailed"
  size="medium"
  [showRole]="true"
  [showEmail]="true"
  [showDepartment]="true"
  [showEmployeeId]="true"
  [showStatus]="true"
  [hoverable]="true"
  [bordered]="true">
</lib-user-card>
```

### 4. Team Member List

Display team members in a compact list:

```typescript
@for (member of teamMembers(); track member.employeeId) {
  <lib-user-card
    [user]="member"
    variant="compact"
    size="small"
    (cardClick)="viewMember(member)">
  </lib-user-card>
}
```

## Events

### Card Click Event

```typescript
<lib-user-card
  [user]="user()"
  [clickable]="true"
  (cardClick)="handleCardClick($event)">
</lib-user-card>

// In component:
handleCardClick(user: UserCardData): void {
  console.log('Card clicked:', user);
  // Navigate to user profile, open modal, etc.
}
```

### Avatar Click Event

```typescript
<lib-user-card
  [user]="user()"
  (avatarClick)="handleAvatarClick($event)">
</lib-user-card>

// In component:
handleAvatarClick(user: UserCardData): void {
  console.log('Avatar clicked:', user);
  // Open avatar upload, show image preview, etc.
}
```

## Styling

The component uses design tokens from the Workly design system:

- **Colors**: `--primary-*`, `--surface-*`, `--text-color-*`
- **Spacing**: `--spacing-*` scale
- **Typography**: `--font-size-*`, `--font-weight-*`
- **Borders**: `--border-radius-*`
- **Shadows**: `--shadow-*`

### Custom Styling

You can override styles using CSS custom properties or by targeting component classes:

```scss
lib-user-card {
  .lib-user-card-name {
    color: var(--primary-600);
    font-weight: var(--font-weight-bold);
  }
  
  .lib-user-card-avatar-initials {
    background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-700) 100%);
  }
}
```

## Dark Theme

The component automatically adapts to dark theme when `.p-dark` class is applied:

```typescript
// Enable dark theme
document.documentElement.classList.add('p-dark');
```

## Accessibility

- Proper ARIA labels
- Semantic HTML structure
- Keyboard navigation support
- Focus states for clickable cards
- Alt text for avatar images

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Examples

See Storybook stories for interactive examples:

```bash
nx storybook ui-component
```

Navigate to **Components > User Card** to see all variants and configurations.


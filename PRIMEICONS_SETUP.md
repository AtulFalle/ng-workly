# PrimeIcons Setup Guide

This document explains how PrimeIcons are configured and used in the Workly UI project.

## 📦 Installation

PrimeIcons is already installed as a dependency in `package.json`:

```json
{
  "devDependencies": {
    "primeicons": "^7.0.0"
  }
}
```

## 🎨 Import Configuration

PrimeIcons CSS is imported in the main application styles:

### Shell App (`apps/frontend/shell/workly/src/styles.scss`)
```scss
// Import PrimeIcons
@import 'primeicons/primeicons.css';

// Import design system from the shared library
@import 'design-system.scss';
```

### Auth App (`apps/frontend/features/auth/src/styles.scss`)
```scss
// Import PrimeIcons
@import 'primeicons/primeicons.css';

// Import design system from the shared library
@import 'design-system.scss';
```

## 🔧 Usage

### In Templates
Use PrimeIcons with the `pi` class prefix:

```html
<!-- Search icon -->
<i class="pi pi-search"></i>

<!-- User icon -->
<i class="pi pi-user"></i>

<!-- Bell icon -->
<i class="pi pi-bell"></i>

<!-- Palette icon -->
<i class="pi pi-palette"></i>
```

### In PrimeNG Components
PrimeNG components automatically use PrimeIcons:

```html
<!-- Button with icon -->
<p-button icon="pi pi-check" label="Save"></p-button>

<!-- Menu with icons -->
<p-menubar [model]="menuItems"></p-menubar>
```

### In Header Component
The header component uses various PrimeIcons:

```html
<!-- Search input with icon -->
<span class="p-input-icon-left">
  <i class="pi pi-search"></i>
  <input type="text" pInputText placeholder="Search...">
</span>

<!-- Color palette button -->
<p-button icon="pi pi-palette" [text]="true"></p-button>

<!-- Notification button -->
<p-button icon="pi pi-bell" [text]="true"></p-button>

<!-- User button -->
<p-button icon="pi pi-user" [text]="true"></p-button>
```

## 🧪 Testing Icons

A test component has been created to verify PrimeIcons are working:

```typescript
// shared/ui-component/src/lib/components/icon-test/icon-test.component.ts
@Component({
  selector: 'lib-icon-test',
  template: `
    <div class="icon-test-container">
      <h3>PrimeIcons Test</h3>
      <div class="icon-grid">
        <div class="icon-item">
          <i class="pi pi-search"></i>
          <span>Search</span>
        </div>
        <!-- More icon examples... -->
      </div>
    </div>
  `
})
export class IconTestComponent {}
```

## 🎯 Available Icons

PrimeIcons provides over 200 icons. Common ones used in the project:

| Icon | Class | Usage |
|------|-------|-------|
| 🔍 | `pi pi-search` | Search functionality |
| 🎨 | `pi pi-palette` | Color/theme selection |
| 🔔 | `pi pi-bell` | Notifications |
| 👤 | `pi pi-user` | User profile |
| 🏠 | `pi pi-home` | Home navigation |
| ⚙️ | `pi pi-cog` | Settings |
| 🚪 | `pi pi-sign-out` | Logout |
| ✅ | `pi pi-check` | Success/confirmation |

## 🔍 Troubleshooting

### Icons Not Visible
1. **Check Import**: Ensure PrimeIcons CSS is imported in `styles.scss`
2. **Check Class**: Verify the icon class is correct (e.g., `pi pi-search`)
3. **Check Build**: Run `npm run build:shell` to ensure no build errors
4. **Check Browser**: Open browser dev tools to check for CSS loading errors

### Common Issues
- **Missing Import**: PrimeIcons CSS not imported in main styles
- **Wrong Class**: Using incorrect class name (should be `pi pi-iconname`)
- **Build Errors**: TypeScript compilation errors preventing proper CSS loading

### Verification Steps
1. Start development server: `npm start`
2. Open browser to http://localhost:4200
3. Look for the "PrimeIcons Test" section
4. Verify all icons are visible and styled correctly

## 📚 Resources

- [PrimeIcons Documentation](https://primeng.org/icons)
- [PrimeIcons GitHub](https://github.com/primefaces/primeicons)
- [Icon List](https://primeng.org/icons/list)

## 🚀 Next Steps

1. **Custom Icons**: Add custom icon fonts if needed
2. **Icon Components**: Create reusable icon components
3. **Icon Theming**: Apply theme colors to icons
4. **Performance**: Optimize icon loading for production

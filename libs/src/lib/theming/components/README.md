# PrimeNG Component Style Overrides

This directory contains component-specific style overrides for PrimeNG components using the design tokens from the theming system.

## 📁 File Structure

```
components/
├── _index.scss          # Main import file for all components
├── _button.scss         # Button component overrides
├── _input.scss          # Input components overrides
├── _card.scss           # Card component overrides
├── _panel.scss          # Panel component overrides
├── _toolbar.scss        # Toolbar component overrides
├── _menubar.scss        # Menubar component overrides
├── _toast.scss          # Toast component overrides
├── _dropdown.scss       # Dropdown component overrides
├── _table.scss          # Table component overrides
└── README.md            # This documentation file
```

## 🎨 Design Token Usage

All component overrides use the design tokens defined in `_variables.scss`:

### Color Tokens
- `--primary-*` - Primary color palette
- `--secondary-*` - Secondary color palette
- `--success-*` - Success color palette
- `--warning-*` - Warning color palette
- `--error-*` - Error color palette
- `--info-*` - Info color palette
- `--surface-*` - Surface color palette
- `--text-color-*` - Text color variants

### Spacing Tokens
- `--spacing-1` to `--spacing-24` - Consistent spacing scale
- Used for padding, margins, gaps, etc.

### Typography Tokens
- `--font-size-*` - Font size scale
- `--font-weight-*` - Font weight variants
- `--line-height-*` - Line height variants

### Border & Radius Tokens
- `--border-radius-*` - Border radius scale
- `--border-color` - Border color variants

### Shadow Tokens
- `--shadow-sm` - Small shadow
- `--shadow-md` - Medium shadow
- `--shadow-lg` - Large shadow
- `--shadow-xl` - Extra large shadow

## 🔧 Component Features

### Button Component (`_button.scss`)
- **Variants**: Primary, Secondary, Success, Warning, Danger, Info
- **Sizes**: Small, Default, Large
- **States**: Text, Outlined, Disabled
- **Features**: Icons, Button groups, Hover effects
- **Dark Theme**: Full dark mode support

### Input Component (`_input.scss`)
- **Types**: Text, Textarea, Password, Dropdown, Multiselect
- **Sizes**: Small, Default, Large
- **States**: Valid, Invalid, Disabled
- **Features**: Icons, Placeholders, Focus states
- **Dark Theme**: Full dark mode support

### Card Component (`_card.scss`)
- **Variants**: Default, Elevated, Outlined, Flat
- **Sections**: Header, Content, Footer, Actions
- **Features**: Images, Grid layout, Hover effects
- **Dark Theme**: Full dark mode support

### Panel Component (`_panel.scss`)
- **Variants**: Default, Elevated, Outlined, Flat
- **Features**: Collapsible, Icons, Actions
- **States**: Expanded, Collapsed
- **Dark Theme**: Full dark mode support

### Toolbar Component (`_toolbar.scss`)
- **Layout**: Horizontal, Vertical
- **Sections**: Left, Center, Right
- **Features**: Search, Actions, Separators
- **Responsive**: Mobile-friendly layout
- **Dark Theme**: Full dark mode support

### Menubar Component (`_menubar.scss`)
- **Layout**: Horizontal, Vertical
- **Features**: Icons, Submenus, Active states
- **Navigation**: Dropdown menus, Hover effects
- **Dark Theme**: Full dark mode support

### Toast Component (`_toast.scss`)
- **Severity**: Success, Info, Warning, Error
- **Positions**: Top/Bottom + Left/Center/Right
- **Features**: Icons, Animations, Auto-dismiss
- **Dark Theme**: Full dark mode support

### Dropdown Component (`_dropdown.scss`)
- **Sizes**: Small, Default, Large
- **States**: Disabled, Valid, Invalid
- **Features**: Icons, Search, Multi-select
- **Dark Theme**: Full dark mode support

### Table Component (`_table.scss`)
- **Features**: Sorting, Filtering, Pagination
- **Selection**: Single, Multiple row selection
- **Actions**: Row actions, Bulk actions
- **Responsive**: Mobile-friendly layout
- **Dark Theme**: Full dark mode support

## 🌙 Dark Theme Support

All components include comprehensive dark theme support using the `.p-dark` class:

```scss
.p-dark {
  .p-button {
    // Dark theme button styles
  }
}
```

## 📱 Responsive Design

Components include responsive design considerations:

```scss
@media (max-width: 768px) {
  .p-toolbar {
    flex-direction: column;
    align-items: stretch;
  }
}
```

## 🎯 Usage Examples

### Button Variants
```html
<p-button label="Primary" severity="primary"></p-button>
<p-button label="Secondary" severity="secondary"></p-button>
<p-button label="Success" severity="success"></p-button>
<p-button label="Warning" severity="warning"></p-button>
<p-button label="Danger" severity="danger"></p-button>
```

### Input with Icons
```html
<span class="p-input-icon-left">
  <i class="pi pi-search"></i>
  <input type="text" pInputText placeholder="Search...">
</span>
```

### Card with Actions
```html
<p-card header="Card Title" subheader="Card Subtitle">
  <ng-template pTemplate="content">
    <p>Card content goes here</p>
  </ng-template>
  <ng-template pTemplate="footer">
    <p-button label="Save" icon="pi pi-check"></p-button>
    <p-button label="Cancel" icon="pi pi-times" severity="secondary"></p-button>
  </ng-template>
</p-card>
```

## 🔄 Adding New Components

To add a new component override:

1. Create a new SCSS file: `_componentname.scss`
2. Use design tokens consistently
3. Include dark theme support
4. Add responsive design considerations
5. Import in `_index.scss`
6. Update this README

### Example New Component
```scss
// _newcomponent.scss
.p-newcomponent {
  // Use design tokens
  padding: var(--spacing-4);
  background-color: var(--surface-0);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  
  // Dark theme support
  .p-dark & {
    background-color: var(--surface-800);
    border-color: var(--surface-600);
  }
}
```

## 🚀 Benefits

1. **Consistency**: All components use the same design tokens
2. **Maintainability**: Centralized styling system
3. **Flexibility**: Easy to customize and extend
4. **Accessibility**: Proper focus states and contrast
5. **Performance**: Optimized CSS with minimal specificity
6. **Dark Theme**: Comprehensive dark mode support
7. **Responsive**: Mobile-first design approach

## 📚 Resources

- [PrimeNG Documentation](https://primeng.org/)
- [Design Tokens Guide](../README.md)
- [Theming System Overview](../_index.scss)

# Workly Color Palette System

A reusable color palette system for dynamic theme selection across applications.

## Features

- 🎨 **Dynamic Color Selection** - Choose from predefined colors or custom colors
- 🔄 **Real-time Updates** - Colors update instantly across all components
- 📱 **Responsive Design** - Works on all screen sizes
- 🧩 **Reusable Components** - Use in any Angular application
- ⚡ **Signal-based** - Built with Angular signals for optimal performance

## Quick Start

### 1. Import the Service and Component

```typescript
import { ColorPaletteService, ColorPaletteComponent } from '@workly/theming';
```

### 2. Add to Your Component

```typescript
@Component({
  imports: [ColorPaletteComponent],
  template: `
    <workly-color-palette 
      title="🎨 Choose Your Theme Color"
      (colorSelected)="onColorSelected($event)"
      (customColorSelected)="onCustomColorSelected($event)">
    </workly-color-palette>
  `
})
export class MyComponent {
  private colorPaletteService = inject(ColorPaletteService);

  onColorSelected(color: string): void {
    console.log('Color selected:', color);
  }

  onCustomColorSelected(color: string): void {
    console.log('Custom color selected:', color);
  }
}
```

### 3. Configure the Service (Optional)

```typescript
// In your app.config.ts or component
colorPaletteService.configure({
  predefinedColors: [
    { name: 'Brand Blue', value: '#007bff' },
    { name: 'Success Green', value: '#28a745' }
  ],
  enableCustomColor: true,
  defaultColor: '#007bff'
});
```

## API Reference

### ColorPaletteService

#### Methods

- `selectColor(color: string)` - Select a predefined color
- `selectCustomColor(customColor?: string)` - Select a custom color
- `getColorPalette()` - Get current color palette
- `getSelectedColor()` - Get currently selected color
- `isColorSelected(color: string)` - Check if color is selected
- `resetToDefault()` - Reset to default color
- `configure(config: ColorPaletteConfig)` - Configure the service

#### Signals

- `selectedColor` - Currently selected color (readonly)
- `customColor` - Current custom color (readonly)
- `colorPalette` - Available color options (computed)
- `isCustomColorEnabled` - Whether custom color picker is enabled (computed)

### ColorPaletteComponent

#### Inputs

- `title?: string` - Title for the color palette
- `customColors?: ColorOption[]` - Additional custom colors
- `showCustomPicker?: boolean` - Show/hide custom color picker

#### Outputs

- `colorSelected` - Emitted when a predefined color is selected
- `customColorSelected` - Emitted when a custom color is selected

## How It Works

1. **CSS Custom Properties** - The service updates `--user-primary-color` CSS variable
2. **Automatic Palette Generation** - Uses CSS `color-mix()` to generate 50-950 color scales
3. **PrimeNG Integration** - All PrimeNG components automatically use the dynamic colors
4. **Signal-based State** - Reactive updates using Angular signals

## Styling

The component includes built-in styles that automatically adapt to the selected color theme. All styles use CSS custom properties that update dynamically.

## Browser Support

- Modern browsers with CSS `color-mix()` support
- Fallback colors provided for older browsers
- Progressive enhancement approach

## Examples

### Basic Usage
```html
<workly-color-palette></workly-color-palette>
```

### With Custom Title
```html
<workly-color-palette title="🎨 Pick Your Brand Color"></workly-color-palette>
```

### With Event Handlers
```html
<workly-color-palette 
  (colorSelected)="handleColorChange($event)"
  (customColorSelected)="handleCustomColor($event)">
</workly-color-palette>
```

### Service-only Usage
```typescript
export class MyComponent {
  private colorService = inject(ColorPaletteService);
  
  changeToBlue() {
    this.colorService.selectColor('#3b82f6');
  }
  
  changeToCustom() {
    this.colorService.selectCustomColor('#ff6b6b');
  }
}
```

## Integration with Other Apps

The color palette system is designed to work across multiple applications in a microfrontend architecture:

1. **Shared State** - Color selection persists across app boundaries
2. **Consistent Theming** - All apps use the same color system
3. **Independent Deployment** - Each app can be deployed independently
4. **Type Safety** - Full TypeScript support with proper types
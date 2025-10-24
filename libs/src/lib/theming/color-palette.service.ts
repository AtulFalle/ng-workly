import { Injectable, signal, computed } from '@angular/core';

export interface ColorOption {
  name: string;
  value: string;
}

export interface ColorPaletteConfig {
  predefinedColors?: ColorOption[];
  enableCustomColor?: boolean;
  defaultColor?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ColorPaletteService {
  // Signals for reactive state management
  private _selectedColor = signal('#a855f7');
  private _customColor = signal('#a855f7');
  
  // Default color palette
  private _defaultColorPalette: ColorOption[] = [
    { name: 'Purple', value: '#a855f7' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Teal', value: '#14b8a6' },
    { name: 'Yellow', value: '#eab308' },
    { name: 'Gray', value: '#6b7280' }
  ];

  private _config = signal<ColorPaletteConfig>({
    predefinedColors: this._defaultColorPalette,
    enableCustomColor: true,
    defaultColor: '#6366f1'
  });

  // Public readonly signals
  readonly selectedColor = this._selectedColor.asReadonly();
  readonly customColor = this._customColor.asReadonly();
  readonly config = this._config.asReadonly();
  
  // Computed signals
  readonly colorPalette = computed(() => this._config().predefinedColors || this._defaultColorPalette);
  readonly isCustomColorEnabled = computed(() => this._config().enableCustomColor ?? true);

  constructor() {
    // Initialize with default color
    this.updatePrimaryColor(this._selectedColor());
  }

  /**
   * Configure the color palette service
   */
  configure(config: Partial<ColorPaletteConfig>): void {
    this._config.update(current => ({ ...current, ...config }));
    
    // Update default color if provided
    if (config.defaultColor) {
      this._selectedColor.set(config.defaultColor);
      this._customColor.set(config.defaultColor);
      this.updatePrimaryColor(config.defaultColor);
    }
  }

  /**
   * Select a predefined color
   */
  selectColor(color: string): void {
    this._selectedColor.set(color);
    this.updatePrimaryColor(color);
    this.onColorChange(color, 'predefined');
  }

  /**
   * Select a custom color
   */
  selectCustomColor(customColor?: string): void {
    const color = customColor || this._customColor();
    this._customColor.set(color);
    this._selectedColor.set(color);
    this.updatePrimaryColor(color);
    this.onColorChange(color, 'custom');
  }

  /**
   * Get current color palette
   */
  getColorPalette(): ColorOption[] {
    return this.colorPalette();
  }

  /**
   * Get current selected color
   */
  getSelectedColor(): string {
    return this.selectedColor();
  }

  /**
   * Check if a color is currently selected
   */
  isColorSelected(color: string): boolean {
    return this.selectedColor() === color;
  }

  /**
   * Reset to default color
   */
  resetToDefault(): void {
    const defaultColor = this._config().defaultColor || '#a855f7';
    this._selectedColor.set(defaultColor);
    this._customColor.set(defaultColor);
    this.updatePrimaryColor(defaultColor);
    this.onColorChange(defaultColor, 'reset');
  }

  /**
   * Update the CSS custom property to change the entire color palette
   */
  private updatePrimaryColor(color: string): void {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--user-primary-color', color);
    }
  }

  /**
   * Hook for color change events - can be overridden by consumers
   */
  protected onColorChange(color: string, source: 'predefined' | 'custom' | 'reset'): void {
    // This can be extended by consumers to add custom logic
    console.log(`Color changed to ${color} from ${source}`);
  }

  /**
   * Generate a color palette from a base color
   */
  generateColorPalette(baseColor: string): ColorOption[] {
    // This could be extended to generate harmonious color palettes
    return [
      { name: 'Light', value: this.lightenColor(baseColor, 0.8) },
      { name: 'Base', value: baseColor },
      { name: 'Dark', value: this.darkenColor(baseColor, 0.2) }
    ];
  }

  /**
   * Lighten a color by a percentage
   */
  private lightenColor(color: string, amount: number): string {
    // Simple color lightening - could be enhanced with proper color manipulation
    return color;
  }

  /**
   * Darken a color by a percentage
   */
  private darkenColor(color: string, amount: number): string {
    // Simple color darkening - could be enhanced with proper color manipulation
    return color;
  }
}

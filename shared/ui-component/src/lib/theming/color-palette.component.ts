import { Component, input, output, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorPaletteService, ColorOption } from './color-palette.service';

@Component({
  selector: 'lib-color-palette',
  imports: [CommonModule, FormsModule],
  templateUrl: './color-palette.component.html',
  styleUrl: './color-palette.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPaletteComponent {
  private colorPaletteService = inject(ColorPaletteService);

  // Inputs
  title = input<string>('🎨 Choose Your Theme Color');
  customColors = input<ColorOption[]>([]);
  showCustomPicker = input<boolean>(true);

  // Outputs
  colorSelected = output<string>();
  customColorSelected = output<string>();

  // Component state
  customColorValue = signal('#a855f7');

  // Computed properties
  colorPalette = this.colorPaletteService.colorPalette;
  enableCustomColor = this.colorPaletteService.isCustomColorEnabled;
  selectedColor = this.colorPaletteService.selectedColor;

  constructor() {
    // Initialize custom color value
    this.customColorValue.set(this.colorPaletteService.getSelectedColor());
  }

  /**
   * Select a predefined color
   */
  selectColor(color: string): void {
    this.colorPaletteService.selectColor(color);
    this.colorSelected.emit(color);
  }

  /**
   * Select a custom color
   */
  selectCustomColor(): void {
    const color = this.customColorValue();
    this.colorPaletteService.selectCustomColor(color);
    this.customColorSelected.emit(color);
  }

  /**
   * Check if a color is currently selected
   */
  isColorSelected(color: string): boolean {
    return this.colorPaletteService.isColorSelected(color);
  }
}

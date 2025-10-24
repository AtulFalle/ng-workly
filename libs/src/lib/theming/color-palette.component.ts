import { Component, Input, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorPaletteService, ColorOption } from './color-palette.service';

@Component({
  selector: 'workly-color-palette',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="color-palette-selector">
      <h3 *ngIf="title">{{ title }}</h3>
      <div class="color-options">
        <div 
          class="color-option" 
          *ngFor="let color of colorPalette()" 
          [style.background-color]="color.value"
          [class.selected]="isColorSelected(color.value)"
          (click)="selectColor(color.value)"
          [title]="color.name">
          <span class="color-name">{{ color.name }}</span>
        </div>
      </div>
      
      <div class="custom-color-picker" *ngIf="enableCustomColor()">
        <label for="customColor">Or choose custom color:</label>
        <input 
          type="color" 
          id="customColor" 
          [(ngModel)]="customColorValue"
          (change)="selectCustomColor()"
          class="color-input">
      </div>
    </div>
  `,
  styles: [`
    .color-palette-selector {
      background: var(--primary-50);
      border: 2px solid var(--primary-200);
      border-radius: 12px;
      padding: 1.5rem;
      margin: 1rem 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .p-dark .color-palette-selector {
      background: var(--primary-900-dark);
      border: 2px solid var(--primary-700-dark);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    
    .color-palette-selector h3 {
      color: var(--primary-800);
      margin: 0 0 1rem 0;
      font-weight: 600;
    }
    
    .p-dark .color-palette-selector h3 {
      color: var(--primary-200-dark);
    }
    
    .color-options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 0.75rem;
      margin-bottom: 1rem;
    }
    
    .color-option {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      border: 2px solid transparent;
      position: relative;
      overflow: hidden;
    }
    
    .color-option:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    
    .color-option.selected {
      border-color: var(--primary-600);
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
      transform: scale(1.05);
    }
    
    .color-option .color-name {
      color: white;
      font-weight: 600;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
      font-size: 0.875rem;
    }
    
    .custom-color-picker {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: white;
      border-radius: 8px;
      border: 1px solid var(--primary-200);
    }
    
    .p-dark .custom-color-picker {
      background: var(--primary-800-dark);
      border: 1px solid var(--primary-600-dark);
    }
    
    .custom-color-picker label {
      color: var(--primary-700);
      font-weight: 500;
    }
    
    .p-dark .custom-color-picker label {
      color: var(--primary-300-dark);
    }
    
    .custom-color-picker .color-input {
      width: 60px;
      height: 40px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class ColorPaletteComponent {
  private colorPaletteService = inject(ColorPaletteService);

  // Input properties
  @Input() title: string = '🎨 Choose Your Theme Color';
  @Input() customColors: ColorOption[] = [];
  @Input() showCustomPicker: boolean = true;

  // Output events
  @Output() colorSelected = new EventEmitter<string>();
  @Output() customColorSelected = new EventEmitter<string>();

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

// PrimeNG Theming Module
// ======================
// This module provides theming utilities and theme switching functionality

import { Injectable, signal, computed } from '@angular/core';

export type Theme = 'light' | 'dark' | 'compact';

@Injectable({
  providedIn: 'root'
})
export class ThemingService {
  private readonly _currentTheme = signal<Theme>('light');
  
  // Read-only signal for current theme
  readonly currentTheme = this._currentTheme.asReadonly();
  
  // Computed signals for theme-specific classes
  readonly isDark = computed(() => this._currentTheme() === 'dark');
  readonly isLight = computed(() => this._currentTheme() === 'light');
  readonly isCompact = computed(() => this._currentTheme() === 'compact');
  
  // Available themes
  readonly availableThemes: Theme[] = ['light', 'dark', 'compact'];
  
  constructor() {
    // Initialize theme from localStorage or system preference
    this.initializeTheme();
  }

  /**
   * Set the current theme
   * @param theme The theme to apply
   */
  setTheme(theme: Theme): void {
    this._currentTheme.set(theme);
    this.applyTheme(theme);
    this.saveTheme(theme);
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const newTheme = this._currentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Get the current theme
   */
  getCurrentTheme(): Theme {
    return this._currentTheme();
  }

  /**
   * Check if a specific theme is active
   */
  isThemeActive(theme: Theme): boolean {
    return this._currentTheme() === theme;
  }

  /**
   * Apply theme to the document
   */
  private applyTheme(theme: Theme): void {
    const htmlElement = document.documentElement;
    
    // Remove all theme classes
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.availableThemes.forEach(_t => {
      htmlElement.removeAttribute(`data-theme`);
    });
    
    // Apply the new theme
    htmlElement.setAttribute('data-theme', theme);
    
    // Update body class for additional styling
    document.body.className = document.body.className
      .replace(/theme-\w+/g, '')
      .trim();
    document.body.classList.add(`theme-${theme}`);
  }

  /**
   * Initialize theme from localStorage or system preference
   */
  private initializeTheme(): void {
    // Try to get theme from localStorage
    const savedTheme = localStorage.getItem('app-theme') as Theme;
    
    if (savedTheme && this.availableThemes.includes(savedTheme)) {
      this.setTheme(savedTheme);
      return;
    }
    
    // Fall back to system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  }

  /**
   * Save theme to localStorage
   */
  private saveTheme(theme: Theme): void {
    localStorage.setItem('app-theme', theme);
  }

  /**
   * Listen to system theme changes
   */
  watchSystemTheme(): void {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      mediaQuery.addEventListener('change', (e) => {
        // Only auto-switch if no theme is saved
        if (!localStorage.getItem('app-theme')) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }
}

// Theme utility functions
export class ThemeUtils {
  /**
   * Get theme-specific CSS custom properties
   */
  static getThemeProperties(theme: Theme): Record<string, string> {
    const properties: Record<string, string> = {};
    
    // Add theme-specific properties based on the theme
    switch (theme) {
      case 'dark':
        properties['--text-color'] = '#fafafa';
        properties['--surface-0'] = '#171717';
        properties['--border-color'] = '#404040';
        break;
      case 'compact':
        properties['--spacing-4'] = '0.5rem';
        properties['--font-size-base'] = '0.875rem';
        break;
      default:
        // Light theme (default)
        properties['--text-color'] = '#171717';
        properties['--surface-0'] = '#ffffff';
        properties['--border-color'] = '#e5e5e5';
    }
    
    return properties;
  }

  /**
   * Apply theme properties to an element
   */
  static applyThemeToElement(element: HTMLElement, theme: Theme): void {
    const properties = this.getThemeProperties(theme);
    
    Object.entries(properties).forEach(([property, value]) => {
      element.style.setProperty(property, value);
    });
  }

  /**
   * Get contrast color for a given background color
   */
  static getContrastColor(backgroundColor: string): string {
    // Simple contrast calculation
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    return brightness > 128 ? '#000000' : '#ffffff';
  }
}

// Theme constants
export const THEME_CONSTANTS = {
  STORAGE_KEY: 'app-theme',
  DEFAULT_THEME: 'light' as Theme,
  THEMES: {
    LIGHT: 'light' as Theme,
    DARK: 'dark' as Theme,
    COMPACT: 'compact' as Theme
  }
} as const;

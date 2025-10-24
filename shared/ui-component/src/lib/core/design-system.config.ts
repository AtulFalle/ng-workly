
/**
 * Centralized design system configuration for shared components
 * This ensures consistent styling and theming across all components
 */
export const DESIGN_SYSTEM_CONFIG = {
  // Color system
  colors: {
    primary: 'var(--primary-500)',
    primaryHover: 'var(--primary-600)',
    primaryActive: 'var(--primary-700)',
    secondary: 'var(--primary-100)',
    success: 'var(--green-500)',
    warning: 'var(--yellow-500)',
    error: 'var(--red-500)',
    info: 'var(--blue-500)',
    surface: 'var(--surface-0)',
    surfaceHover: 'var(--surface-100)',
    text: 'var(--text-color)',
    textSecondary: 'var(--text-color-secondary)',
    border: 'var(--surface-border)',
    borderHover: 'var(--primary-300)'
  },
  
  // Spacing system
  spacing: {
    xs: 'var(--spacing-xs)',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
    '2xl': 'var(--spacing-2xl)',
    '3xl': 'var(--spacing-3xl)'
  },
  
  // Typography system
  typography: {
    fontFamily: 'var(--font-family)',
    fontSize: {
      xs: 'var(--font-size-xs)',
      sm: 'var(--font-size-sm)',
      base: 'var(--font-size-base)',
      lg: 'var(--font-size-lg)',
      xl: 'var(--font-size-xl)',
      '2xl': 'var(--font-size-2xl)',
      '3xl': 'var(--font-size-3xl)',
      '4xl': 'var(--font-size-4xl)'
    },
    fontWeight: {
      normal: 'var(--font-weight-normal)',
      medium: 'var(--font-weight-medium)',
      semibold: 'var(--font-weight-semibold)',
      bold: 'var(--font-weight-bold)'
    },
    lineHeight: {
      tight: 'var(--line-height-tight)',
      normal: 'var(--line-height-normal)',
      loose: 'var(--line-height-loose)'
    }
  },
  
  // Border radius system
  borderRadius: {
    sm: 'var(--border-radius-sm)',
    md: 'var(--border-radius-md)',
    lg: 'var(--border-radius-lg)',
    xl: 'var(--border-radius-xl)',
    full: 'var(--border-radius-full)'
  },
  
  // Shadow system
  shadows: {
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    xl: 'var(--shadow-xl)'
  },
  
  // Animation system
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    easing: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }
};

/**
 * Design system utility functions
 */
export class DesignSystemUtils {
  /**
   * Get CSS custom property value
   */
  static getCSSVar(property: string): string {
    if (typeof document !== 'undefined') {
      return getComputedStyle(document.documentElement).getPropertyValue(property);
    }
    return '';
  }
  
  /**
   * Set CSS custom property value
   */
  static setCSSVar(property: string, value: string): void {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty(property, value);
    }
  }
  
  /**
   * Get responsive breakpoint
   */
  static getBreakpoint(): 'sm' | 'md' | 'lg' | 'xl' {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) return 'sm';
      if (width < 768) return 'md';
      if (width < 1024) return 'lg';
      return 'xl';
    }
    return 'lg';
  }
  
  /**
   * Check if dark mode is active
   */
  static isDarkMode(): boolean {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('p-dark');
    }
    return false;
  }
  
  /**
   * Toggle dark mode
   */
  static toggleDarkMode(): void {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('p-dark');
    }
  }
}

// PrimeNG Theming Module Exports
// ==============================

// Export the theming service and utilities
export * from './theming.module';

// Export theme types
export type { Theme } from './theming.module';

// Export theme constants
export { THEME_CONSTANTS } from './theming.module';

// Export theme utilities
export { ThemeUtils } from './theming.module';

// Export the theming service
export { ThemingService } from './theming.module';

// Export color palette functionality
export { ColorPaletteService } from './color-palette.service';
export { ColorPaletteComponent } from './color-palette.component';
export type { ColorOption, ColorPaletteConfig } from './color-palette.service';

// Export themes
export { default as Workly } from './themes/workly';

import { providePrimeNG } from 'primeng/config';
// import { ThemingService } from '@workly/theming/theming.module';
import Aura from '@primeuix/themes/aura';

/**
 * Centralized PrimeNG configuration for all shared components
 * This ensures consistent theming and configuration across all components
 */
export const PRIME_NG_CONFIG = {
  theme: {
    preset: Aura,
  },
};

/**
 * PrimeNG providers for dependency injection
 * Use this in your app.config.ts or component providers
 */
export const PRIME_NG_PROVIDERS = [
  providePrimeNG(PRIME_NG_CONFIG),
  // ThemingService
];

/**
 * Common PrimeNG module imports for shared components
 * Import this in your components to get all necessary PrimeNG modules
 */
export const PRIME_NG_MODULES = [
  // Core modules
  'CommonModule',
  'FormsModule',
  'ReactiveFormsModule',
  
  // Layout modules
  'CardModule',
  'PanelModule',
  'DividerModule',
  'ToolbarModule',
  'MenubarModule',
  
  // Form modules
  'InputTextModule',
  'InputTextareaModule',
  'PasswordModule',
  'ButtonModule',
  'CheckboxModule',
  'RadioButtonModule',
  'SelectModule',
  'DropdownModule',
  'MultiSelectModule',
  'CalendarModule',
  'SliderModule',
  'RatingModule',
  
  // Data modules
  'TableModule',
  'PaginatorModule',
  'DataViewModule',
  'OrderListModule',
  'PickListModule',
  
  // Overlay modules
  'DialogModule',
  'OverlayPanelModule',
  'TooltipModule',
  'ConfirmDialogModule',
  'ToastModule',
  'MessageModule',
  
  // File modules
  'FileUploadModule',
  'ProgressBarModule',
  'ProgressSpinnerModule',
  
  // Menu modules
  'TieredMenuModule',
  'ContextMenuModule',
  'BreadcrumbModule',
  'StepsModule',
  'TabViewModule',
  'AccordionModule',
  
  // Chart modules (if needed)
  'ChartModule',
  
  // Misc modules
  'AvatarModule',
  'BadgeModule',
  'ChipModule',
  'TagModule',
  'KnobModule',
  'ToggleButtonModule',
  'SplitButtonModule',
  'SplitterModule',
  'ScrollPanelModule',
  'ScrollTopModule',
  'SkeletonModule',
  'TimelineModule',
  'VirtualScrollerModule'
];

/**
 * Get PrimeNG module imports as a string array for easy importing
 */
export function getPrimeNGModuleImports(): string[] {
  return PRIME_NG_MODULES.map(module => `import { ${module} } from 'primeng/${module.toLowerCase()}';`);
}

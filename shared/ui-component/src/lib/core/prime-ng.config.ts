/**
 * PrimeNG Configuration
 * =====================
 * PrimeNG provider configuration and constants
 */

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Workly from '../theming/themes/workly';

/**
 * PrimeNG default configuration
 */
export const PRIME_NG_CONFIG = {
  theme: {
    preset: Aura
  }
};

/**
 * PrimeNG Workly theme configuration
 */
export const PRIME_NG_WORKLY_CONFIG = {
  theme: {
    preset: Workly
  }
};

/**
 * PrimeNG providers
 */
export const PRIME_NG_PROVIDERS = [
  providePrimeNG(PRIME_NG_CONFIG)
];

/**
 * PrimeNG Workly providers
 */
export const PRIME_NG_WORKLY_PROVIDERS = [
  providePrimeNG(PRIME_NG_WORKLY_CONFIG)
];


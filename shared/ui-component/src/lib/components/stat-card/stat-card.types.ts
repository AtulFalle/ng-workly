/**
 * Stat Card Types and Interfaces
 * ==============================
 * Type definitions for stat card configuration
 */

export type StatCardVariant = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';

export type StatCardSize = 'small' | 'medium' | 'large';

export type StatCardTrend = 'up' | 'down' | 'neutral' | 'none';

export interface StatCardConfig {
  title: string;
  value: string | number;
  icon?: string;
  variant?: StatCardVariant;
  size?: StatCardSize;
  trend?: StatCardTrend;
  trendValue?: string | number;
  subtitle?: string;
  description?: string;
  showIcon?: boolean;
  showTrend?: boolean;
  loading?: boolean;
}

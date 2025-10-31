// Timeline Types and Interfaces
// =============================
// Type definitions for timeline configuration

export type TimelineAlignment = 'left' | 'right' | 'alternate';
export type TimelineSize = 'small' | 'medium' | 'large';
export type TimelineVariant = 'default' | 'employee' | 'leave' | 'attendance' | 'performance' | 'training' | 'project' | 'hiring' | 'payroll';
export type TimelineItemStatus = 'pending' | 'in-progress' | 'completed' | 'approved' | 'rejected' | 'cancelled' | 'success' | 'warning' | 'error' | 'info';

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp: Date;
  icon?: string;
  status?: TimelineItemStatus;
  variant?: TimelineVariant;
  metadata?: Record<string, any>;
  actions?: TimelineAction[];
  avatar?: string;
  user?: {
    name: string;
    avatar?: string;
    role?: string;
  };
}

export interface TimelineAction {
  label: string;
  icon?: string;
  command?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

export interface TimelineConfig {
  alignment: TimelineAlignment;
  size: TimelineSize;
  variant: TimelineVariant;
  showIcons: boolean;
  showDates: boolean;
  showAvatars: boolean;
  showActions: boolean;
}

/**
 * Status Chip Component Types
 * ===========================
 * Type definitions for the Status Chip component variants and configurations
 */

// HRM Status Types
export type EmployeeStatus = 'active' | 'inactive' | 'on-leave' | 'terminated' | 'pending';
export type LeaveStatus = 'approved' | 'rejected' | 'pending' | 'cancelled' | 'under-review';
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'half-day' | 'on-leave';
export type DocumentStatus = 'approved' | 'rejected' | 'pending' | 'under-review' | 'expired';
export type RequestStatus = 'approved' | 'rejected' | 'pending' | 'cancelled' | 'in-progress';

// Generic Status Type (union of all status types)
export type StatusChipStatus = 
  | EmployeeStatus 
  | LeaveStatus 
  | AttendanceStatus 
  | DocumentStatus 
  | RequestStatus;

// Status Chip Variants
export type StatusChipVariant = 'filled' | 'outlined' | 'soft' | 'text';
export type StatusChipSize = 'small' | 'medium' | 'large';

// Status Chip Configuration
export interface StatusChipConfig {
  variant?: StatusChipVariant;
  size?: StatusChipSize;
  showIcon?: boolean;
  showDot?: boolean;
  removable?: boolean;
}


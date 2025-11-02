/**
 * Attendance Punch Card Component Types
 * =====================================
 * Type definitions for the Attendance Punch Card component
 */

export type AttendancePunchCardVariant = 'default' | 'compact' | 'detailed' | 'minimal';
export type AttendancePunchCardSize = 'small' | 'medium' | 'large';
export type AttendancePunchCardStatus = 'not-checked-in' | 'checked-in' | 'checked-out' | 'on-break' | 'late' | 'absent';

export interface AttendancePunchCardData {
  status: AttendancePunchCardStatus;
  checkIn?: Date | null;
  checkOut?: Date | null;
  totalHours?: number;
  location?: string;
  device?: string;
  scheduledTime?: Date;
  actualCheckIn?: Date;
  breakStart?: Date;
  breakEnd?: Date;
  isLate?: boolean;
  lateBy?: number; // minutes
  overtimeHours?: number;
}

export interface AttendancePunchCardConfig {
  variant?: AttendancePunchCardVariant;
  size?: AttendancePunchCardSize;
  showLocation?: boolean;
  showDevice?: boolean;
  showBreakInfo?: boolean;
  showOvertime?: boolean;
  showScheduledTime?: boolean;
  compactActions?: boolean;
  allowCheckIn?: boolean;
  allowCheckOut?: boolean;
  allowBreakActions?: boolean;
}


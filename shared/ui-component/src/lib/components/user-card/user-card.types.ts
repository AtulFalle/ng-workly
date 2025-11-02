/**
 * User Card Component Types
 * ========================
 * Type definitions for the User Card component variants and configurations
 */

export type UserCardVariant = 'default' | 'header' | 'table' | 'compact' | 'detailed';
export type UserCardSize = 'small' | 'medium' | 'large';
export type UserCardAvatarPosition = 'left' | 'right';

export interface UserCardData {
  name: string;
  subtitle?: string;
  avatar?: string;
  role?: string;
  email?: string;
  department?: string;
  employeeId?: string;
  status?: 'active' | 'inactive' | 'on-leave' | 'pending';
  initials?: string;
}

export interface UserCardConfig {
  variant?: UserCardVariant;
  size?: UserCardSize;
  avatarPosition?: UserCardAvatarPosition;
  showRole?: boolean;
  showEmail?: boolean;
  showDepartment?: boolean;
  showEmployeeId?: boolean;
  showStatus?: boolean;
  clickable?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
}


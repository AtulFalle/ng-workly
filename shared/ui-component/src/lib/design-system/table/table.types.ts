/**
 * Table Component Types
 * ====================
 * Type definitions for the Table component with HRM-specific configurations
 */

export type TableVariant = 'default' | 'employees' | 'attendance' | 'leaves' | 'payroll' | 'compact';
export type TableSize = 'small' | 'medium' | 'large';
export type ColumnType = 'text' | 'number' | 'date' | 'status' | 'employee' | 'action' | 'checkbox' | 'currency' | 'badge' | 'custom';

export interface TableColumn {
  field: string;
  header: string;
  type?: ColumnType;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: 'text' | 'number' | 'date' | 'select' | 'multiselect';
  filterOptions?: { label: string; value: any }[];
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  align?: 'left' | 'center' | 'right';
  frozen?: boolean;
  exportable?: boolean;
  cellClass?: string | ((row: any) => string);
  headerClass?: string;
  template?: string; // For custom column templates
}

export interface TableAction {
  label: string;
  icon?: string;
  severity?: 'primary' | 'secondary' | 'success' | 'info' | 'danger';
  action: (row: any) => void;
  visible?: (row: any) => boolean;
  disabled?: (row: any) => boolean;
  separator?: boolean;
}

export interface TableSelection {
  mode: 'single' | 'multiple' | 'checkbox';
  enabled: boolean;
}

export interface TableConfig {
  variant?: TableVariant;
  size?: TableSize;
  striped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  selection?: TableSelection;
  exportable?: boolean;
  resizable?: boolean;
  scrollable?: boolean;
  scrollHeight?: string;
  loading?: boolean;
  emptyMessage?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  rowActions?: TableAction[];
  bulkActions?: TableAction[];
}

export interface TableData<T = any> {
  columns: TableColumn[];
  rows: T[];
  totalRecords?: number;
  config?: TableConfig;
}


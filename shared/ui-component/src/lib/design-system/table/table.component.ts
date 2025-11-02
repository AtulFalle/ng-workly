import { Component, input, output, computed, ChangeDetectionStrategy, TemplateRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { StatusChipComponent } from '../status-chip/status-chip.component';
import { StatusChipStatus } from '../status-chip/status-chip.types';
import { TableColumn, TableAction, TableConfig, TableVariant, TableSize } from './table.types';

@Component({
  selector: 'lib-table',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    PaginatorModule,
    CheckboxModule,
    TooltipModule,
    MenuModule,
    BadgeModule,
    UserCardComponent,
    StatusChipComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  // Inputs
  columns = input.required<TableColumn[]>();
  rows = input.required<any[]>();
  variant = input<TableVariant>('default');
  size = input<TableSize>('medium');
  config = input<TableConfig>({});
  loading = input<boolean>(false);
  selection = input<any[]>([]);
  globalFilterValue = input<string>('');

  // Outputs
  rowSelect = output<any>();
  rowUnselect = output<any>();
  selectionChange = output<any[]>();
  rowClick = output<any>();
  rowDblClick = output<any>();
  sortChange = output<any>();
  filterChange = output<any>();
  pageChange = output<any>();
  actionClick = output<{ action: string; row: any }>();

  // Internal state
  first = signal(0);
  rowsPerPage = signal(10);
  selectedRows = signal<any[]>([]);
  globalFilter = signal<string>('');

  // Computed properties
  tableConfig = computed(() => {
    const defaultConfig: TableConfig = {
      variant: this.variant(),
      size: this.size(),
      striped: false,
      bordered: true,
      hoverable: true,
      sortable: true,
      filterable: true,
      pagination: true,
      pageSize: 10,
      pageSizeOptions: [5, 10, 25, 50, 100],
      selection: { mode: 'checkbox', enabled: false },
      scrollable: false,
      showHeader: true,
      showFooter: false,
      loading: false,
      emptyMessage: 'No records found'
    };

    return { ...defaultConfig, ...this.config() };
  });

  paginatedRows = computed(() => {
    const rows = this.rows();
    const config = this.tableConfig();
    
    if (!config.pagination) {
      return rows;
    }

    const first = this.first();
    const rowsPerPage = this.rowsPerPage();
    return rows.slice(first, first + rowsPerPage);
  });

  totalRecords = computed(() => {
    return this.rows().length;
  });

  tableClass = computed(() => {
    const classes = ['lib-table'];
    classes.push(`lib-table--${this.variant()}`);
    classes.push(`lib-table--${this.size()}`);
    
    const config = this.tableConfig();
    if (config.striped) classes.push('lib-table--striped');
    if (config.bordered) classes.push('lib-table--bordered');
    if (config.hoverable) classes.push('lib-table--hoverable');
    
    return classes.join(' ');
  });

  hasSelection = computed(() => {
    const config = this.tableConfig();
    return config.selection?.enabled ?? false;
  });

  hasActions = computed(() => {
    const config = this.tableConfig();
    return (config.rowActions?.length ?? 0) > 0;
  });

  hasBulkActions = computed(() => {
    const config = this.tableConfig();
    return (config.bulkActions?.length ?? 0) > 0 && this.hasSelection();
  });

  globalFilterFields = computed(() => {
    return this.columns()
      .filter(c => c.filterable !== false)
      .map(c => c.field);
  });

  // Methods
  onRowSelect(event: any): void {
    this.selectedRows.set(event.data);
    this.rowSelect.emit(event.data);
    this.selectionChange.emit([event.data]);
  }

  onRowUnselect(event: any): void {
    this.selectedRows.set([]);
    this.rowUnselect.emit(event.data);
    this.selectionChange.emit([]);
  }

  onSelectionChange(event: any): void {
    this.selectedRows.set(event);
    this.selectionChange.emit(event);
  }

  onRowClickHandler(event: any): void {
    this.rowClick.emit(event);
  }

  onRowDblClickHandler(event: any): void {
    this.rowDblClick.emit(event);
  }

  onSortChange(event: any): void {
    this.sortChange.emit(event);
  }

  onFilterChange(event: any): void {
    this.filterChange.emit(event);
  }

  onPageChange(event: any): void {
    this.first.set(event.first);
    this.rowsPerPage.set(event.rows);
    this.pageChange.emit(event);
  }

  onActionClick(action: TableAction, row: any): void {
    if (action.disabled && action.disabled(row)) {
      return;
    }
    this.actionClick.emit({ action: action.label, row });
    action.action(row);
  }

  getCellClass(column: TableColumn, row: any): string {
    if (typeof column.cellClass === 'function') {
      return column.cellClass(row);
    }
    return column.cellClass || '';
  }

  isColumnVisible(column: TableColumn): boolean {
    return true; // Can add visibility logic here
  }

  getEmployeeData(row: any, field: string): any {
    const employee = row[field];
    if (typeof employee === 'object' && employee !== null) {
      return employee;
    }
    // Fallback: create employee object from row data
    return {
      name: row.name || row.employeeName || '',
      subtitle: row.department || row.role || '',
      avatar: row.avatar || row.image || undefined,
      employeeId: row.employeeId || row.id || '',
      status: row.status
    };
  }

  getStatusValue(row: any, field: string): StatusChipStatus {
    const value = row[field];
    if (!value) return 'pending';
    // Cast to StatusChipStatus - could add validation here
    return value as StatusChipStatus;
  }

  hasActionColumn = computed(() => {
    return this.columns().some(c => c.type === 'action');
  });

  colspanCount = computed(() => {
    return this.columns().length + (this.hasSelection() ? 1 : 0) + (this.hasActions() && !this.hasActionColumn() ? 1 : 0);
  });

  formatDate(value: any): string {
    if (!value) return '';
    const date = value instanceof Date ? value : new Date(value);
    return date.toLocaleDateString();
  }

  formatCurrency(value: number): string {
    if (value === null || value === undefined) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  }

  formatNumber(value: number): string {
    if (value === null || value === undefined) return '';
    return new Intl.NumberFormat('en-US').format(value);
  }
}


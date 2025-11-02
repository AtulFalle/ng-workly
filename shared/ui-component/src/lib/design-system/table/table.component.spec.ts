import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TableComponent } from './table.component';
import { TableColumn, TableConfig, TableVariant, TableSize, TableAction } from './table.types';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  const mockColumns: TableColumn[] = [
    { field: 'id', header: 'ID', type: 'number' },
    { field: 'name', header: 'Name', type: 'text' },
    { field: 'status', header: 'Status', type: 'status' }
  ];

  const mockRows = [
    { id: 1, name: 'John Doe', status: 'active' },
    { id: 2, name: 'Jane Smith', status: 'inactive' },
    { id: 3, name: 'Bob Johnson', status: 'active' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
      providers: [provideNoopAnimations()],
      schemas: [NO_ERRORS_SCHEMA] // Ignore child components for unit testing
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('columns', mockColumns);
    fixture.componentRef.setInput('rows', mockRows);
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default variant as default', () => {
      expect(component.variant()).toBe('default');
    });

    it('should have default size as medium', () => {
      expect(component.size()).toBe('medium');
    });

    it('should have default loading as false', () => {
      expect(component.loading()).toBe(false);
    });

    it('should have default config as empty object', () => {
      expect(component.config()).toEqual({});
    });

    it('should have default selection as empty array', () => {
      expect(component.selection()).toEqual([]);
    });

    it('should have default globalFilterValue as empty string', () => {
      expect(component.globalFilterValue()).toBe('');
    });
  });

  describe('Input Properties', () => {
    it('should accept columns input', () => {
      fixture.componentRef.setInput('columns', mockColumns);
      fixture.detectChanges();
      expect(component.columns()).toEqual(mockColumns);
    });

    it('should accept rows input', () => {
      fixture.componentRef.setInput('rows', mockRows);
      fixture.detectChanges();
      expect(component.rows()).toEqual(mockRows);
    });

    it('should accept variant input', () => {
      const variants: TableVariant[] = ['default', 'employees', 'attendance', 'leaves', 'payroll', 'compact'];
      variants.forEach(variant => {
        fixture.componentRef.setInput('variant', variant);
        fixture.detectChanges();
        expect(component.variant()).toBe(variant);
      });
    });

    it('should accept size input', () => {
      const sizes: TableSize[] = ['small', 'medium', 'large'];
      sizes.forEach(size => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();
        expect(component.size()).toBe(size);
      });
    });

    it('should accept config input', () => {
      const config: TableConfig = {
        striped: true,
        bordered: false,
        hoverable: true
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      expect(component.config()).toEqual(config);
    });

    it('should accept loading input', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();
      expect(component.loading()).toBe(true);
    });

    it('should accept selection input', () => {
      const selection = [mockRows[0]];
      fixture.componentRef.setInput('selection', selection);
      fixture.detectChanges();
      expect(component.selection()).toEqual(selection);
    });

    it('should accept globalFilterValue input', () => {
      fixture.componentRef.setInput('globalFilterValue', 'search term');
      fixture.detectChanges();
      expect(component.globalFilterValue()).toBe('search term');
    });
  });

  describe('tableConfig', () => {
    it('should return default config when no config provided', () => {
      fixture.detectChanges();
      const config = component.tableConfig();
      
      expect(config.variant).toBe('default');
      expect(config.size).toBe('medium');
      expect(config.striped).toBe(false);
      expect(config.bordered).toBe(true);
      expect(config.hoverable).toBe(true);
      expect(config.sortable).toBe(true);
      expect(config.filterable).toBe(true);
      expect(config.pagination).toBe(true);
      expect(config.pageSize).toBe(10);
    });

    it('should merge custom config with defaults', () => {
      const customConfig: TableConfig = {
        striped: true,
        bordered: false,
        pageSize: 25
      };
      fixture.componentRef.setInput('config', customConfig);
      fixture.detectChanges();
      
      const config = component.tableConfig();
      expect(config.striped).toBe(true);
      expect(config.bordered).toBe(false);
      expect(config.pageSize).toBe(25);
      expect(config.hoverable).toBe(true); // From default
    });
  });

  describe('paginatedRows', () => {
    it('should return all rows when pagination is disabled', () => {
      const config: TableConfig = {
        pagination: false
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      
      const paginated = component.paginatedRows();
      expect(paginated.length).toBe(mockRows.length);
    });

    it('should return paginated rows when pagination is enabled', () => {
      component.first.set(0);
      component.rowsPerPage.set(2);
      fixture.detectChanges();
      
      const paginated = component.paginatedRows();
      expect(paginated.length).toBe(2);
      expect(paginated[0]).toEqual(mockRows[0]);
      expect(paginated[1]).toEqual(mockRows[1]);
    });

    it('should handle pagination offset', () => {
      component.first.set(2);
      component.rowsPerPage.set(2);
      fixture.detectChanges();
      
      const paginated = component.paginatedRows();
      expect(paginated.length).toBe(1);
      expect(paginated[0]).toEqual(mockRows[2]);
    });
  });

  describe('totalRecords', () => {
    it('should return total number of rows', () => {
      fixture.detectChanges();
      expect(component.totalRecords()).toBe(mockRows.length);
    });

    it('should update when rows change', () => {
      fixture.detectChanges();
      expect(component.totalRecords()).toBe(3);
      
      const newRows = [...mockRows, { id: 4, name: 'New', status: 'active' }];
      fixture.componentRef.setInput('rows', newRows);
      fixture.detectChanges();
      
      expect(component.totalRecords()).toBe(4);
    });
  });

  describe('tableClass', () => {
    it('should include base lib-table class', () => {
      fixture.detectChanges();
      const tableClass = component.tableClass();
      expect(tableClass).toContain('lib-table');
    });

    it('should include variant class', () => {
      fixture.componentRef.setInput('variant', 'employees');
      fixture.detectChanges();
      const tableClass = component.tableClass();
      expect(tableClass).toContain('lib-table--employees');
    });

    it('should include size class', () => {
      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();
      const tableClass = component.tableClass();
      expect(tableClass).toContain('lib-table--large');
    });

    it('should include striped class when striped is true', () => {
      const config: TableConfig = { striped: true };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      const tableClass = component.tableClass();
      expect(tableClass).toContain('lib-table--striped');
    });

    it('should include bordered class when bordered is true', () => {
      const config: TableConfig = { bordered: true };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      const tableClass = component.tableClass();
      expect(tableClass).toContain('lib-table--bordered');
    });

    it('should include hoverable class when hoverable is true', () => {
      const config: TableConfig = { hoverable: true };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      const tableClass = component.tableClass();
      expect(tableClass).toContain('lib-table--hoverable');
    });
  });

  describe('Selection Computed Properties', () => {
    it('should return hasSelection as false when selection is disabled', () => {
      fixture.detectChanges();
      expect(component.hasSelection()).toBe(false);
    });

    it('should return hasSelection as true when selection is enabled', () => {
      const config: TableConfig = {
        selection: { mode: 'checkbox', enabled: true }
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      
      expect(component.hasSelection()).toBe(true);
    });

    it('should return hasActions as false when no row actions', () => {
      fixture.detectChanges();
      expect(component.hasActions()).toBe(false);
    });

    it('should return hasActions as true when row actions exist', () => {
      const config: TableConfig = {
        rowActions: [
          { label: 'Edit', action: jest.fn() },
          { label: 'Delete', action: jest.fn() }
        ]
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      
      expect(component.hasActions()).toBe(true);
    });

    it('should return hasBulkActions as false when no bulk actions', () => {
      fixture.detectChanges();
      expect(component.hasBulkActions()).toBe(false);
    });

    it('should return hasBulkActions as true when bulk actions and selection enabled', () => {
      const config: TableConfig = {
        selection: { mode: 'checkbox', enabled: true },
        bulkActions: [
          { label: 'Delete All', action: jest.fn() }
        ]
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      
      expect(component.hasBulkActions()).toBe(true);
    });
  });

  describe('globalFilterFields', () => {
    it('should return all filterable columns', () => {
      fixture.detectChanges();
      const fields = component.globalFilterFields();
      expect(fields).toContain('id');
      expect(fields).toContain('name');
      expect(fields).toContain('status');
    });

    it('should exclude non-filterable columns', () => {
      const columns: TableColumn[] = [
        { field: 'id', header: 'ID', filterable: true },
        { field: 'name', header: 'Name', filterable: false },
        { field: 'status', header: 'Status' }
      ];
      fixture.componentRef.setInput('columns', columns);
      fixture.detectChanges();
      
      const fields = component.globalFilterFields();
      expect(fields).toContain('id');
      expect(fields).toContain('status');
      expect(fields).not.toContain('name');
    });
  });

  describe('Events', () => {
    it('should emit rowSelect and selectionChange on row select', () => {
      jest.spyOn(component.rowSelect, 'emit');
      jest.spyOn(component.selectionChange, 'emit');
      
      const event = { data: mockRows[0] };
      component.onRowSelect(event);
      
      expect(component.rowSelect.emit).toHaveBeenCalledWith(mockRows[0]);
      expect(component.selectionChange.emit).toHaveBeenCalledWith([mockRows[0]]);
      expect(component.selectedRows()).toEqual([mockRows[0]]);
    });

    it('should emit rowUnselect and selectionChange on row unselect', () => {
      jest.spyOn(component.rowUnselect, 'emit');
      jest.spyOn(component.selectionChange, 'emit');
      
      const event = { data: mockRows[0] };
      component.onRowUnselect(event);
      
      expect(component.rowUnselect.emit).toHaveBeenCalledWith(mockRows[0]);
      expect(component.selectionChange.emit).toHaveBeenCalledWith([]);
      expect(component.selectedRows()).toEqual([]);
    });

    it('should emit selectionChange on selection change', () => {
      jest.spyOn(component.selectionChange, 'emit');
      
      const selected = [mockRows[0], mockRows[1]];
      component.onSelectionChange(selected);
      
      expect(component.selectionChange.emit).toHaveBeenCalledWith(selected);
      expect(component.selectedRows()).toEqual(selected);
    });

    it('should emit rowClick on row click', () => {
      jest.spyOn(component.rowClick, 'emit');
      
      const event = { data: mockRows[0] };
      component.onRowClickHandler(event);
      
      expect(component.rowClick.emit).toHaveBeenCalledWith(event);
    });

    it('should emit rowDblClick on row double click', () => {
      jest.spyOn(component.rowDblClick, 'emit');
      
      const event = { data: mockRows[0] };
      component.onRowDblClickHandler(event);
      
      expect(component.rowDblClick.emit).toHaveBeenCalledWith(event);
    });

    it('should emit sortChange on sort', () => {
      jest.spyOn(component.sortChange, 'emit');
      
      const event = { field: 'name', order: 1 };
      component.onSortChange(event);
      
      expect(component.sortChange.emit).toHaveBeenCalledWith(event);
    });

    it('should emit filterChange on filter', () => {
      jest.spyOn(component.filterChange, 'emit');
      
      const event = { field: 'name', value: 'John' };
      component.onFilterChange(event);
      
      expect(component.filterChange.emit).toHaveBeenCalledWith(event);
    });

    it('should emit pageChange and update pagination on page change', () => {
      jest.spyOn(component.pageChange, 'emit');
      
      const event = { first: 10, rows: 20 };
      component.onPageChange(event);
      
      expect(component.first()).toBe(10);
      expect(component.rowsPerPage()).toBe(20);
      expect(component.pageChange.emit).toHaveBeenCalledWith(event);
    });

    it('should emit actionClick and call action on action click', () => {
      const actionFn = jest.fn();
      const action: TableAction = {
        label: 'Edit',
        action: actionFn
      };
      
      jest.spyOn(component.actionClick, 'emit');
      
      component.onActionClick(action, mockRows[0]);
      
      expect(component.actionClick.emit).toHaveBeenCalledWith({
        action: 'Edit',
        row: mockRows[0]
      });
      expect(actionFn).toHaveBeenCalledWith(mockRows[0]);
    });

    it('should not call action when disabled', () => {
      const actionFn = jest.fn();
      const action: TableAction = {
        label: 'Edit',
        action: actionFn,
        disabled: () => true
      };
      
      component.onActionClick(action, mockRows[0]);
      
      expect(actionFn).not.toHaveBeenCalled();
    });
  });

  describe('Helper Methods', () => {
    it('should return cell class from string', () => {
      const column: TableColumn = {
        field: 'name',
        header: 'Name',
        cellClass: 'custom-class'
      };
      
      const cellClass = component.getCellClass(column, mockRows[0]);
      expect(cellClass).toBe('custom-class');
    });

    it('should return cell class from function', () => {
      const column: TableColumn = {
        field: 'name',
        header: 'Name',
        cellClass: (row: any) => row.status === 'active' ? 'active' : 'inactive'
      };
      
      const activeClass = component.getCellClass(column, mockRows[0]);
      const inactiveClass = component.getCellClass(column, mockRows[1]);
      
      expect(activeClass).toBe('active');
      expect(inactiveClass).toBe('inactive');
    });

    it('should return empty string when no cellClass', () => {
      const column: TableColumn = {
        field: 'name',
        header: 'Name'
      };
      
      const cellClass = component.getCellClass(column, mockRows[0]);
      expect(cellClass).toBe('');
    });

    it('should return true for isColumnVisible', () => {
      const column: TableColumn = {
        field: 'name',
        header: 'Name'
      };
      
      expect(component.isColumnVisible(column)).toBe(true);
    });

    it('should format date correctly', () => {
      const date = new Date('2024-01-15');
      const formatted = component.formatDate(date);
      
      expect(formatted).toBeTruthy();
      expect(typeof formatted).toBe('string');
    });

    it('should format currency correctly', () => {
      const formatted = component.formatCurrency(1234.56);
      
      expect(formatted).toContain('$');
      expect(formatted).toContain('1,234.56');
    });

    it('should format number correctly', () => {
      const formatted = component.formatNumber(1234567);
      
      expect(formatted).toBe('1,234,567');
    });

    it('should return empty string for null/undefined values in formatDate', () => {
      expect(component.formatDate(null)).toBe('');
      expect(component.formatDate(undefined)).toBe('');
    });

    it('should return empty string for null/undefined values in formatCurrency', () => {
      expect(component.formatCurrency(null as any)).toBe('');
      expect(component.formatCurrency(undefined as any)).toBe('');
    });

    it('should return empty string for null/undefined values in formatNumber', () => {
      expect(component.formatNumber(null as any)).toBe('');
      expect(component.formatNumber(undefined as any)).toBe('');
    });
  });

  describe('getEmployeeData', () => {
    it('should return employee object when field is object', () => {
      const row = { employee: { name: 'John', subtitle: 'Developer' } };
      const employee = component.getEmployeeData(row, 'employee');
      
      expect(employee).toEqual({ name: 'John', subtitle: 'Developer' });
    });

    it('should create employee object from row data when field is not object', () => {
      const row = { name: 'John', department: 'IT', id: '123' };
      const employee = component.getEmployeeData(row, 'name');
      
      expect(employee.name).toBe('John');
      expect(employee.subtitle).toBe('IT');
      expect(employee.employeeId).toBe('123');
    });
  });

  describe('getStatusValue', () => {
    it('should return status value from row', () => {
      const status = component.getStatusValue(mockRows[0], 'status');
      expect(status).toBe('active');
    });

    it('should return pending when value is missing', () => {
      const row = { id: 1, name: 'Test' };
      const status = component.getStatusValue(row, 'status');
      expect(status).toBe('pending');
    });
  });

  describe('hasActionColumn', () => {
    it('should return false when no action columns', () => {
      fixture.detectChanges();
      expect(component.hasActionColumn()).toBe(false);
    });

    it('should return true when action column exists', () => {
      const columns: TableColumn[] = [
        ...mockColumns,
        { field: 'actions', header: 'Actions', type: 'action' }
      ];
      fixture.componentRef.setInput('columns', columns);
      fixture.detectChanges();
      
      expect(component.hasActionColumn()).toBe(true);
    });
  });

  describe('colspanCount', () => {
    it('should calculate colspan correctly', () => {
      fixture.detectChanges();
      const colspan = component.colspanCount();
      expect(colspan).toBe(mockColumns.length);
    });

    it('should include selection column in colspan', () => {
      const config: TableConfig = {
        selection: { mode: 'checkbox', enabled: true }
      };
      fixture.componentRef.setInput('config', config);
      fixture.detectChanges();
      
      const colspan = component.colspanCount();
      expect(colspan).toBe(mockColumns.length + 1);
    });
  });
});

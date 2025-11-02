import type { Meta, StoryObj } from '@storybook/angular';
import { TableComponent } from './table.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig } from '@storybook/angular';
import { providePrimeNG } from 'primeng/config';
import { provideRouter } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { TableColumn, TableConfig } from './table.types';

const meta: Meta<TableComponent> = {
  title: 'Design System/Table',
  component: TableComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        providePrimeNG({ theme: { preset: Aura } }),
        provideRouter([])
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: 'Comprehensive table component for HRM applications with support for employee cards, status chips, sorting, filtering, pagination, and selection. Integrates with UserCard and StatusChip components.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<TableComponent>;

// Sample data
const employees = [
  {
    id: '1',
    employee: { name: 'John Doe', subtitle: 'Senior Developer', avatar: 'https://via.placeholder.com/32', employeeId: 'EMP-001', status: 'active' },
    department: 'Engineering',
    email: 'john.doe@company.com',
    status: 'active',
    joinDate: new Date('2020-01-15'),
    salary: 95000
  },
  {
    id: '2',
    employee: { name: 'Jane Smith', subtitle: 'HR Manager', avatar: 'https://via.placeholder.com/32', employeeId: 'EMP-002', status: 'active' },
    department: 'Human Resources',
    email: 'jane.smith@company.com',
    status: 'active',
    joinDate: new Date('2019-05-20'),
    salary: 85000
  },
  {
    id: '3',
    employee: { name: 'Bob Johnson', subtitle: 'Designer', employeeId: 'EMP-003', status: 'on-leave' },
    department: 'Design',
    email: 'bob.johnson@company.com',
    status: 'on-leave',
    joinDate: new Date('2021-03-10'),
    salary: 70000
  }
];

const attendanceRecords = [
  {
    id: '1',
    employee: { name: 'John Doe', subtitle: 'Senior Developer', employeeId: 'EMP-001' },
    date: new Date('2024-01-15'),
    checkIn: new Date('2024-01-15T09:00:00'),
    checkOut: new Date('2024-01-15T18:00:00'),
    hours: 8,
    status: 'present',
    location: 'Office'
  },
  {
    id: '2',
    employee: { name: 'Jane Smith', subtitle: 'HR Manager', employeeId: 'EMP-002' },
    date: new Date('2024-01-15'),
    checkIn: new Date('2024-01-15T09:30:00'),
    checkOut: new Date('2024-01-15T18:30:00'),
    hours: 8.5,
    status: 'present',
    location: 'Office'
  },
  {
    id: '3',
    employee: { name: 'Bob Johnson', subtitle: 'Designer', employeeId: 'EMP-003' },
    date: new Date('2024-01-15'),
    checkIn: new Date('2024-01-15T10:00:00'),
    checkOut: new Date('2024-01-15T18:00:00'),
    hours: 7,
    status: 'late',
    location: 'Office'
  }
];

const leaveRequests = [
  {
    id: '1',
    employee: { name: 'John Doe', subtitle: 'Senior Developer', employeeId: 'EMP-001' },
    leaveType: 'Annual Leave',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-02-05'),
    days: 5,
    status: 'approved',
    reason: 'Vacation'
  },
  {
    id: '2',
    employee: { name: 'Jane Smith', subtitle: 'HR Manager', employeeId: 'EMP-002' },
    leaveType: 'Sick Leave',
    startDate: new Date('2024-02-10'),
    endDate: new Date('2024-02-10'),
    days: 1,
    status: 'pending',
    reason: 'Medical appointment'
  },
  {
    id: '3',
    employee: { name: 'Bob Johnson', subtitle: 'Designer', employeeId: 'EMP-003' },
    leaveType: 'Personal Leave',
    startDate: new Date('2024-02-15'),
    endDate: new Date('2024-02-20'),
    days: 5,
    status: 'rejected',
    reason: 'Family event'
  }
];

// Default Table
export const Default: Story = {
  render: () => ({
    props: {
      columns: [
        { field: 'name', header: 'Name', type: 'text' },
        { field: 'department', header: 'Department', type: 'text' },
        { field: 'status', header: 'Status', type: 'status' }
      ] as TableColumn[],
      rows: [
        { id: '1', name: 'John Doe', department: 'Engineering', status: 'active' },
        { id: '2', name: 'Jane Smith', department: 'HR', status: 'active' },
        { id: '3', name: 'Bob Johnson', department: 'Design', status: 'on-leave' }
      ]
    },
    template: `
      <lib-table
        [columns]="columns"
        [rows]="rows">
      </lib-table>
    `
  })
};

// Employees Table
export const EmployeesTable: Story = {
  render: () => ({
    props: {
      columns: [
        { field: 'employee', header: 'Employee', type: 'employee', sortable: true },
        { field: 'department', header: 'Department', type: 'text', sortable: true },
        { field: 'email', header: 'Email', type: 'text', sortable: true },
        { field: 'status', header: 'Status', type: 'status', sortable: true },
        { field: 'joinDate', header: 'Join Date', type: 'date', sortable: true },
        { field: 'salary', header: 'Salary', type: 'currency', align: 'right', sortable: true }
      ] as TableColumn[],
      rows: employees,
      config: {
        variant: 'employees',
        size: 'medium',
        pagination: true,
        pageSize: 10,
        selection: { mode: 'checkbox', enabled: true },
        rowActions: [
          { label: 'Edit', icon: 'pi pi-pencil', severity: 'primary', action: (row: any) => console.log('Edit', row) },
          { label: 'Delete', icon: 'pi pi-trash', severity: 'danger', action: (row: any) => console.log('Delete', row) }
        ],
        bulkActions: [
          { label: 'Export Selected', icon: 'pi pi-download', severity: 'secondary', action: (rows: any[]) => console.log('Export', rows) },
          { label: 'Delete Selected', icon: 'pi pi-trash', severity: 'danger', action: (rows: any[]) => console.log('Delete', rows) }
        ]
      } as TableConfig
    },
    template: `
      <lib-table
        [columns]="columns"
        [rows]="rows"
        [config]="config"
        (actionClick)="console.log($event)">
      </lib-table>
    `
  })
};

// Attendance Table
export const AttendanceTable: Story = {
  render: () => ({
    props: {
      columns: [
        { field: 'employee', header: 'Employee', type: 'employee', sortable: true },
        { field: 'date', header: 'Date', type: 'date', sortable: true },
        { field: 'checkIn', header: 'Check In', type: 'date' },
        { field: 'checkOut', header: 'Check Out', type: 'date' },
        { field: 'hours', header: 'Hours', type: 'number', align: 'right' },
        { field: 'status', header: 'Status', type: 'status', sortable: true },
        { field: 'location', header: 'Location', type: 'text' }
      ] as TableColumn[],
      rows: attendanceRecords,
      config: {
        variant: 'attendance',
        size: 'medium',
        pagination: true,
        pageSize: 10
      } as TableConfig
    },
    template: `
      <lib-table
        [columns]="columns"
        [rows]="rows"
        [config]="config">
      </lib-table>
    `
  })
};

// Leaves Table
export const LeavesTable: Story = {
  render: () => ({
    props: {
      columns: [
        { field: 'employee', header: 'Employee', type: 'employee', sortable: true },
        { field: 'leaveType', header: 'Leave Type', type: 'text', sortable: true },
        { field: 'startDate', header: 'Start Date', type: 'date', sortable: true },
        { field: 'endDate', header: 'End Date', type: 'date', sortable: true },
        { field: 'days', header: 'Days', type: 'number', align: 'right' },
        { field: 'status', header: 'Status', type: 'status', sortable: true },
        { field: 'reason', header: 'Reason', type: 'text' }
      ] as TableColumn[],
      rows: leaveRequests,
      config: {
        variant: 'leaves',
        size: 'medium',
        pagination: true,
        pageSize: 10,
        rowActions: [
          { label: 'Approve', icon: 'pi pi-check', severity: 'success', action: (row: any) => console.log('Approve', row), visible: (row: any) => row.status === 'pending' },
          { label: 'Reject', icon: 'pi pi-times', severity: 'danger', action: (row: any) => console.log('Reject', row), visible: (row: any) => row.status === 'pending' },
          { label: 'View', icon: 'pi pi-eye', severity: 'secondary', action: (row: any) => console.log('View', row) }
        ]
      } as TableConfig
    },
    template: `
      <lib-table
        [columns]="columns"
        [rows]="rows"
        [config]="config">
      </lib-table>
    `
  })
};

// Compact Table
export const CompactTable: Story = {
  render: () => ({
    props: {
      columns: [
        { field: 'name', header: 'Name', type: 'text' },
        { field: 'department', header: 'Department', type: 'text' },
        { field: 'status', header: 'Status', type: 'status' }
      ] as TableColumn[],
      rows: [
        { id: '1', name: 'John Doe', department: 'Engineering', status: 'active' },
        { id: '2', name: 'Jane Smith', department: 'HR', status: 'active' },
        { id: '3', name: 'Bob Johnson', department: 'Design', status: 'on-leave' }
      ],
      config: {
        variant: 'compact',
        size: 'small',
        pagination: false
      } as TableConfig
    },
    template: `
      <lib-table
        [columns]="columns"
        [rows]="rows"
        [config]="config">
      </lib-table>
    `
  })
};


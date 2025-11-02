import type { Meta, StoryObj } from '@storybook/angular';
import { StatusChipComponent } from './status-chip.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig } from '@storybook/angular';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

const meta: Meta<StatusChipComponent> = {
  title: 'Design System/Status Chip',
  component: StatusChipComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        providePrimeNG({ theme: { preset: Aura } })
      ]
    })
  ],
  argTypes: {
    status: {
      control: 'select',
      options: [
        // Employee Statuses
        'active', 'inactive', 'on-leave', 'terminated', 'pending',
        // Leave Statuses
        'approved', 'rejected', 'cancelled', 'under-review',
        // Attendance Statuses
        'present', 'absent', 'late', 'half-day',
        // Document Statuses
        'expired',
        // Request Statuses
        'in-progress'
      ],
      description: 'Status type for HRM applications'
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'soft', 'text'],
      description: 'Visual variant style'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Chip size'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'Status chip component for displaying HRM statuses with multiple variants, sizes, and styling options. Supports employee, leave, attendance, document, and request statuses. **Soft variant is the default and preferred variant for HRM applications.**'
      }
    }
  }
};

export default meta;
type Story = StoryObj<StatusChipComponent>;

// Employee Statuses (Using Soft Variant - Preferred for HRM)
export const EmployeeActive: Story = {
  args: {
    status: 'active',
    variant: 'soft',
    size: 'medium',
    showIcon: true
  }
};

export const EmployeeInactive: Story = {
  args: {
    status: 'inactive',
    variant: 'soft',
    size: 'medium',
    showIcon: true
  }
};

export const EmployeeOnLeave: Story = {
  args: {
    status: 'on-leave',
    variant: 'soft',
    size: 'medium',
    showIcon: true
  }
};

export const EmployeeTerminated: Story = {
  args: {
    status: 'terminated',
    variant: 'soft',
    size: 'medium',
    showIcon: true
  }
};

export const EmployeePending: Story = {
  args: {
    status: 'pending',
    variant: 'soft',
    size: 'medium',
    showIcon: true
  }
};

// Leave Statuses (Using Soft Variant - Preferred for HRM)
export const LeaveApproved: Story = {
  args: {
    status: 'approved',
    variant: 'soft',
    size: 'medium',
    showIcon: true
  }
};

export const LeaveRejected: Story = {
  args: {
    status: 'rejected',
    variant: 'soft',
    size: 'medium',
    showIcon: true
  }
};

export const LeaveCancelled: Story = {
  args: {
    status: 'cancelled',
    variant: 'soft',
    size: 'medium',
    showIcon: true
  }
};

export const LeaveUnderReview: Story = {
  args: {
    status: 'under-review',
    variant: 'soft',
    size: 'medium',
    showIcon: true
  }
};

// Attendance Statuses (Using Soft Variant - Preferred for HRM)
export const AttendancePresent: Story = {
  args: {
    status: 'present',
    variant: 'soft',
    size: 'medium',
    showIcon: true
  }
};

export const AttendanceAbsent: Story = {
  args: {
    status: 'absent',
    variant: 'soft',
    size: 'medium',
    showIcon: true
  }
};

export const AttendanceLate: Story = {
  args: {
    status: 'late',
    variant: 'soft',
    size: 'medium',
    showIcon: true
  }
};

export const AttendanceHalfDay: Story = {
  args: {
    status: 'half-day',
    variant: 'soft',
    size: 'medium',
    showIcon: true
  }
};

// Variants
export const SoftVariant: Story = {
  args: {
    status: 'active',
    variant: 'soft',
    size: 'medium',
    showIcon: true
  }
};
SoftVariant.parameters = {
  docs: {
    description: {
      story: '**Soft variant is the default and preferred variant for HRM applications.** It provides a subtle, professional appearance with light background colors.'
    }
  }
};

export const FilledVariant: Story = {
  args: {
    status: 'active',
    variant: 'filled',
    size: 'medium',
    showIcon: true
  }
};

export const OutlinedVariant: Story = {
  args: {
    status: 'active',
    variant: 'outlined',
    size: 'medium',
    showIcon: true
  }
};

export const TextVariant: Story = {
  args: {
    status: 'active',
    variant: 'text',
    size: 'medium',
    showIcon: true
  }
};

// Sizes (Using Soft Variant - Preferred for HRM)
export const SmallSize: Story = {
  args: {
    status: 'active',
    variant: 'soft',
    size: 'small',
    showIcon: true
  }
};

export const MediumSize: Story = {
  args: {
    status: 'active',
    variant: 'soft',
    size: 'medium',
    showIcon: true
  }
};

export const LargeSize: Story = {
  args: {
    status: 'active',
    variant: 'soft',
    size: 'large',
    showIcon: true
  }
};

// With Dot (Using Soft Variant - Preferred for HRM)
export const WithDot: Story = {
  args: {
    status: 'active',
    variant: 'soft',
    size: 'medium',
    showIcon: false,
    showDot: true
  }
};

// Without Icon (Using Soft Variant - Preferred for HRM)
export const WithoutIcon: Story = {
  args: {
    status: 'active',
    variant: 'soft',
    size: 'medium',
    showIcon: false
  }
};

// Removable (Using Soft Variant - Preferred for HRM)
export const Removable: Story = {
  args: {
    status: 'active',
    variant: 'soft',
    size: 'medium',
    showIcon: true,
    removable: true
  }
};

// Custom Label (Using Soft Variant - Preferred for HRM)
export const CustomLabel: Story = {
  args: {
    status: 'active',
    label: 'Active Employee',
    variant: 'soft',
    size: 'medium',
    showIcon: true
  }
};

// All Employee Statuses (Using Soft Variant - Preferred for HRM)
export const AllEmployeeStatuses: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; padding: 1rem;">
        <lib-status-chip status="active" variant="soft" size="medium" [showIcon]="true"></lib-status-chip>
        <lib-status-chip status="inactive" variant="soft" size="medium" [showIcon]="true"></lib-status-chip>
        <lib-status-chip status="on-leave" variant="soft" size="medium" [showIcon]="true"></lib-status-chip>
        <lib-status-chip status="terminated" variant="soft" size="medium" [showIcon]="true"></lib-status-chip>
        <lib-status-chip status="pending" variant="soft" size="medium" [showIcon]="true"></lib-status-chip>
      </div>
    `
  })
};

// All Leave Statuses (Using Soft Variant - Preferred for HRM)
export const AllLeaveStatuses: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; padding: 1rem;">
        <lib-status-chip status="approved" variant="soft" size="medium" [showIcon]="true"></lib-status-chip>
        <lib-status-chip status="rejected" variant="soft" size="medium" [showIcon]="true"></lib-status-chip>
        <lib-status-chip status="cancelled" variant="soft" size="medium" [showIcon]="true"></lib-status-chip>
        <lib-status-chip status="under-review" variant="soft" size="medium" [showIcon]="true"></lib-status-chip>
        <lib-status-chip status="pending" variant="soft" size="medium" [showIcon]="true"></lib-status-chip>
      </div>
    `
  })
};

// All Attendance Statuses (Using Soft Variant - Preferred for HRM)
export const AllAttendanceStatuses: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; padding: 1rem;">
        <lib-status-chip status="present" variant="soft" size="medium" [showIcon]="true"></lib-status-chip>
        <lib-status-chip status="absent" variant="soft" size="medium" [showIcon]="true"></lib-status-chip>
        <lib-status-chip status="late" variant="soft" size="medium" [showIcon]="true"></lib-status-chip>
        <lib-status-chip status="half-day" variant="soft" size="medium" [showIcon]="true"></lib-status-chip>
        <lib-status-chip status="on-leave" variant="soft" size="medium" [showIcon]="true"></lib-status-chip>
      </div>
    `
  })
};

// All Variants (Soft is Preferred for HRM)
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; padding: 1rem;">
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <span style="font-weight: bold; color: #666;">Soft (Preferred for HRM)</span>
          <lib-status-chip status="active" variant="soft" size="medium" [showIcon]="true"></lib-status-chip>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <span style="font-weight: bold; color: #666;">Filled</span>
          <lib-status-chip status="active" variant="filled" size="medium" [showIcon]="true"></lib-status-chip>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <span style="font-weight: bold; color: #666;">Outlined</span>
          <lib-status-chip status="active" variant="outlined" size="medium" [showIcon]="true"></lib-status-chip>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <span style="font-weight: bold; color: #666;">Text</span>
          <lib-status-chip status="active" variant="text" size="medium" [showIcon]="true"></lib-status-chip>
        </div>
      </div>
    `
  })
};

// All Sizes (Using Soft Variant - Preferred for HRM)
export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 1rem; padding: 1rem;">
        <lib-status-chip status="active" variant="soft" size="small" [showIcon]="true"></lib-status-chip>
        <lib-status-chip status="active" variant="soft" size="medium" [showIcon]="true"></lib-status-chip>
        <lib-status-chip status="active" variant="soft" size="large" [showIcon]="true"></lib-status-chip>
      </div>
    `
  })
};

// Different Status Types with Variants (Soft is Preferred for HRM)
export const StatusTypesWithVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; padding: 1rem;">
        <div>
          <h3 style="margin-bottom: 1rem;">Soft ⭐ (Preferred for HRM)</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <lib-status-chip status="active" variant="soft" [showIcon]="true"></lib-status-chip>
            <lib-status-chip status="pending" variant="soft" [showIcon]="true"></lib-status-chip>
            <lib-status-chip status="on-leave" variant="soft" [showIcon]="true"></lib-status-chip>
            <lib-status-chip status="terminated" variant="soft" [showIcon]="true"></lib-status-chip>
          </div>
        </div>
        <div>
          <h3 style="margin-bottom: 1rem;">Filled</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <lib-status-chip status="active" variant="filled" [showIcon]="true"></lib-status-chip>
            <lib-status-chip status="pending" variant="filled" [showIcon]="true"></lib-status-chip>
            <lib-status-chip status="on-leave" variant="filled" [showIcon]="true"></lib-status-chip>
            <lib-status-chip status="terminated" variant="filled" [showIcon]="true"></lib-status-chip>
          </div>
        </div>
        <div>
          <h3 style="margin-bottom: 1rem;">Outlined</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <lib-status-chip status="active" variant="outlined" [showIcon]="true"></lib-status-chip>
            <lib-status-chip status="pending" variant="outlined" [showIcon]="true"></lib-status-chip>
            <lib-status-chip status="on-leave" variant="outlined" [showIcon]="true"></lib-status-chip>
            <lib-status-chip status="terminated" variant="outlined" [showIcon]="true"></lib-status-chip>
          </div>
        </div>
        <div>
          <h3 style="margin-bottom: 1rem;">Text</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <lib-status-chip status="active" variant="text" [showIcon]="true"></lib-status-chip>
            <lib-status-chip status="pending" variant="text" [showIcon]="true"></lib-status-chip>
            <lib-status-chip status="on-leave" variant="text" [showIcon]="true"></lib-status-chip>
            <lib-status-chip status="terminated" variant="text" [showIcon]="true"></lib-status-chip>
          </div>
        </div>
      </div>
    `
  })
};


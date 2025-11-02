import type { Meta, StoryObj } from '@storybook/angular';
import { AttendancePunchCardComponent } from './attendance-punch-card.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig } from '@storybook/angular';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { AttendancePunchCardData, AttendancePunchCardConfig } from './attendance-punch-card.types';

const meta: Meta<AttendancePunchCardComponent> = {
  title: 'Design System/Attendance Punch Card',
  component: AttendancePunchCardComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        providePrimeNG({ theme: { preset: Aura } })
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: 'A modern, compact attendance punch card component for check-in/check-out functionality. Features multiple variants and sizes, supports location tracking, device info, and break management.'
      }
    }
  },
  argTypes: {
    data: {
      control: 'object',
      description: 'Attendance data including check-in, check-out times, status, etc.'
    },
    config: {
      control: 'object',
      description: 'Configuration object for variant, size, and display options'
    },
    loading: {
      control: 'boolean',
      description: 'Loading state'
    },
    showActions: {
      control: 'boolean',
      description: 'Show/hide action buttons'
    }
  }
};

export default meta;
type Story = StoryObj<AttendancePunchCardComponent>;

// Sample data
const notCheckedIn: AttendancePunchCardData = {
  status: 'not-checked-in'
};

const checkedIn: AttendancePunchCardData = {
  status: 'checked-in',
  checkIn: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
  totalHours: 8.0,
  location: 'Main Office',
  device: 'Mobile App',
  scheduledTime: new Date(new Date().setHours(9, 0, 0, 0))
};

const checkedOut: AttendancePunchCardData = {
  status: 'checked-out',
  checkIn: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
  checkOut: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  totalHours: 9.5,
  location: 'Main Office',
  device: 'Mobile App'
};

const lateCheckIn: AttendancePunchCardData = {
  status: 'late',
  checkIn: new Date(Date.now() - 7.5 * 60 * 60 * 1000),
  totalHours: 7.5,
  location: 'Main Office',
  device: 'Mobile App',
  scheduledTime: new Date(new Date().setHours(9, 0, 0, 0)),
  isLate: true,
  lateBy: 30
};

const withOvertime: AttendancePunchCardData = {
  status: 'checked-in',
  checkIn: new Date(Date.now() - 10 * 60 * 60 * 1000),
  totalHours: 10.0,
  overtimeHours: 2.0,
  location: 'Main Office',
  device: 'Web Portal'
};

const onBreak: AttendancePunchCardData = {
  status: 'on-break',
  checkIn: new Date(Date.now() - 6 * 60 * 60 * 1000),
  totalHours: 4.5,
  location: 'Main Office',
  device: 'Mobile App',
  breakStart: new Date(Date.now() - 30 * 60 * 1000)
};

// Default Story
export const Default: Story = {
  args: {
    data: checkedIn,
    config: {
      variant: 'default',
      size: 'medium',
      showLocation: true,
      showDevice: true,
      allowCheckIn: true,
      allowCheckOut: true
    },
    loading: false,
    showActions: true
  }
};

// Not Checked In
export const NotCheckedIn: Story = {
  args: {
    data: notCheckedIn,
    config: {
      variant: 'default',
      size: 'medium'
    },
    loading: false,
    showActions: true
  }
};

// Checked Out
export const CheckedOut: Story = {
  args: {
    data: checkedOut,
    config: {
      variant: 'default',
      size: 'medium',
      showLocation: true,
      showDevice: true
    },
    loading: false,
    showActions: true
  }
};

// Late Check In
export const LateCheckIn: Story = {
  args: {
    data: lateCheckIn,
    config: {
      variant: 'default',
      size: 'medium',
      showLocation: true,
      showDevice: true,
      showScheduledTime: true
    },
    loading: false,
    showActions: true
  }
};

// With Overtime
export const WithOvertime: Story = {
  args: {
    data: withOvertime,
    config: {
      variant: 'detailed',
      size: 'medium',
      showLocation: true,
      showDevice: true,
      showOvertime: true
    },
    loading: false,
    showActions: true
  }
};

// On Break
export const OnBreak: Story = {
  args: {
    data: onBreak,
    config: {
      variant: 'default',
      size: 'medium',
      showLocation: true,
      showDevice: true,
      allowBreakActions: true
    },
    loading: false,
    showActions: true
  }
};

// Compact Variant
export const Compact: Story = {
  args: {
    data: checkedIn,
    config: {
      variant: 'compact',
      size: 'small',
      showLocation: true,
      showDevice: false,
      compactActions: true
    },
    loading: false,
    showActions: true
  }
};

// Detailed Variant
export const Detailed: Story = {
  args: {
    data: withOvertime,
    config: {
      variant: 'detailed',
      size: 'large',
      showLocation: true,
      showDevice: true,
      showOvertime: true,
      showScheduledTime: true
    },
    loading: false,
    showActions: true
  }
};

// Minimal Variant
export const Minimal: Story = {
  args: {
    data: checkedIn,
    config: {
      variant: 'minimal',
      size: 'medium',
      showLocation: false,
      showDevice: false,
      compactActions: true
    },
    loading: false,
    showActions: true
  }
};

// Loading State
export const Loading: Story = {
  args: {
    data: null,
    config: {
      variant: 'default',
      size: 'medium'
    },
    loading: true,
    showActions: true
  }
};

// Without Actions
export const WithoutActions: Story = {
  args: {
    data: checkedOut,
    config: {
      variant: 'default',
      size: 'medium',
      showLocation: true,
      showDevice: true
    },
    loading: false,
    showActions: false
  }
};

// Small Size
export const SmallSize: Story = {
  args: {
    data: checkedIn,
    config: {
      variant: 'default',
      size: 'small',
      showLocation: true,
      showDevice: true
    },
    loading: false,
    showActions: true
  }
};

// Large Size
export const LargeSize: Story = {
  args: {
    data: checkedIn,
    config: {
      variant: 'default',
      size: 'large',
      showLocation: true,
      showDevice: true
    },
    loading: false,
    showActions: true
  }
};


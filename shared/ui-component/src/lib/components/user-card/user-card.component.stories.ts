import type { Meta, StoryObj } from '@storybook/angular';
import { UserCardComponent } from './user-card.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';

const meta: Meta<UserCardComponent> = {
  title: 'Components/User Card',
  component: UserCardComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        provideRouter([]) // Provide empty router config for Storybook
      ]
    })
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'header', 'table', 'compact', 'detailed'],
      description: 'Card variant style'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Card size'
    },
    avatarPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Avatar position'
    }
  }
};

export default meta;
type Story = StoryObj<UserCardComponent>;

// Default story
export const Default: Story = {
  args: {
    user: {
      name: 'John Doe',
      subtitle: 'Senior Developer',
      avatar: 'https://via.placeholder.com/48',
      role: 'Senior Developer',
      email: 'john.doe@company.com'
    },
    variant: 'default',
    size: 'medium',
    avatarPosition: 'left'
  }
};

// Header variant (for navigation)
export const Header: Story = {
  args: {
    user: {
      name: 'Jane Smith',
      subtitle: 'HR Manager',
      avatar: 'https://via.placeholder.com/40'
    },
    variant: 'header',
    size: 'medium',
    avatarPosition: 'left',
    clickable: true
  }
};

// Table variant (for employee lists)
export const Table: Story = {
  args: {
    user: {
      name: 'Michael Johnson',
      subtitle: 'Software Engineer',
      employeeId: 'EMP-001',
      role: 'Software Engineer',
      status: 'active'
    },
    variant: 'table',
    size: 'small',
    avatarPosition: 'left',
    showStatus: true,
    badge: '3',
    badgeSeverity: 'info'
  }
};

// Compact variant
export const Compact: Story = {
  args: {
    user: {
      name: 'Sarah Williams',
      subtitle: 'Designer'
    },
    variant: 'compact',
    size: 'small',
    avatarPosition: 'left'
  }
};

// Detailed variant
export const Detailed: Story = {
  args: {
    user: {
      name: 'Robert Brown',
      subtitle: 'Team Lead',
      avatar: 'https://via.placeholder.com/64',
      role: 'Engineering Team Lead',
      email: 'robert.brown@company.com',
      department: 'Engineering',
      employeeId: 'EMP-002',
      status: 'active'
    },
    variant: 'detailed',
    size: 'medium',
    avatarPosition: 'left',
    showRole: true,
    showEmail: true,
    showDepartment: true,
    showEmployeeId: true,
    showStatus: true,
    hoverable: true,
    bordered: true
  }
};

// With avatar on right
export const AvatarRight: Story = {
  args: {
    user: {
      name: 'Emily Davis',
      subtitle: 'Product Manager',
      avatar: 'https://via.placeholder.com/48'
    },
    variant: 'default',
    size: 'medium',
    avatarPosition: 'right'
  }
};

// With initials (no avatar image)
export const WithInitials: Story = {
  args: {
    user: {
      name: 'David Wilson',
      subtitle: 'Marketing Director'
      // No avatar - will show initials
    },
    variant: 'default',
    size: 'medium',
    avatarPosition: 'left'
  }
};

// With status badge
export const WithStatus: Story = {
  args: {
    user: {
      name: 'Lisa Anderson',
      subtitle: 'HR Specialist',
      status: 'active'
    },
    variant: 'default',
    size: 'medium',
    avatarPosition: 'left',
    showStatus: true
  }
};

// Clickable card
export const Clickable: Story = {
  args: {
    user: {
      name: 'Mark Taylor',
      subtitle: 'Sales Manager',
      avatar: 'https://via.placeholder.com/48'
    },
    variant: 'default',
    size: 'medium',
    avatarPosition: 'left',
    clickable: true,
    hoverable: true
  }
};

// Large size
export const Large: Story = {
  args: {
    user: {
      name: 'Jennifer Martinez',
      subtitle: 'CEO',
      avatar: 'https://via.placeholder.com/64',
      role: 'Chief Executive Officer'
    },
    variant: 'default',
    size: 'large',
    avatarPosition: 'left'
  }
};

// Small size
export const Small: Story = {
  args: {
    user: {
      name: 'James Lee',
      subtitle: 'Intern'
    },
    variant: 'default',
    size: 'small',
    avatarPosition: 'left'
  }
};

// Table row with multiple statuses
export const TableRows: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px; width: 100%; max-width: 600px;">
        <lib-user-card
          [user]="{
            name: 'Alice Cooper',
            subtitle: 'Frontend Developer',
            employeeId: 'EMP-003',
            status: 'active'
          }"
          variant="table"
          size="small"
          [showStatus]="true"
          badge="5"
          badgeSeverity="info"
        ></lib-user-card>
        <lib-user-card
          [user]="{
            name: 'Bob Johnson',
            subtitle: 'Backend Developer',
            employeeId: 'EMP-004',
            status: 'on-leave'
          }"
          variant="table"
          size="small"
          [showStatus]="true"
        ></lib-user-card>
        <lib-user-card
          [user]="{
            name: 'Charlie Brown',
            subtitle: 'DevOps Engineer',
            employeeId: 'EMP-005',
            status: 'pending'
          }"
          variant="table"
          size="small"
          [showStatus]="true"
        ></lib-user-card>
      </div>
    `
  })
};


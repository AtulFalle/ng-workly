import type { Meta, StoryObj } from '@storybook/angular';
import { StatCardComponent } from './stat-card.component';
import { StatCardVariant, StatCardSize, StatCardTrend } from './stat-card.types';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig } from '@storybook/angular';

const meta: Meta<StatCardComponent> = {
  title: 'Components/Stat Card',
  component: StatCardComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideAnimations()]
    })
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger'],
      description: 'Card color variant'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Card size'
    },
    trend: {
      control: 'select',
      options: ['up', 'down', 'neutral', 'none'],
      description: 'Trend indicator'
    }
  }
};

export default meta;
type Story = StoryObj<StatCardComponent>;

// Default story
export const Default: Story = {
  args: {
    title: 'Total Employees',
    value: 1250,
    icon: 'pi pi-users',
    variant: 'primary',
    size: 'medium',
    trend: 'up',
    trendValue: 12,
    subtitle: 'Active employees',
    description: 'Last 30 days',
    showIcon: true,
    showTrend: true,
    loading: false
  }
};

// Primary variant
export const Primary: Story = {
  args: {
    title: 'Total Hours',
    value: '8,450',
    icon: 'pi pi-clock',
    variant: 'primary',
    size: 'medium',
    trend: 'up',
    trendValue: '+5.2%',
    subtitle: 'This month',
    description: 'Compared to last month'
  }
};

// Success variant
export const Success: Story = {
  args: {
    title: 'Tasks Completed',
    value: 342,
    icon: 'pi pi-check-circle',
    variant: 'success',
    size: 'medium',
    trend: 'up',
    trendValue: 24,
    subtitle: 'This week',
    description: '12% increase'
  }
};

// Info variant
export const Info: Story = {
  args: {
    title: 'Projects Active',
    value: 18,
    icon: 'pi pi-briefcase',
    variant: 'info',
    size: 'medium',
    trend: 'neutral',
    trendValue: 0,
    subtitle: 'Ongoing projects',
    description: 'No change from last month'
  }
};

// Warning variant
export const Warning: Story = {
  args: {
    title: 'Pending Reviews',
    value: 45,
    icon: 'pi pi-exclamation-triangle',
    variant: 'warning',
    size: 'medium',
    trend: 'down',
    trendValue: -8,
    subtitle: 'Requires attention',
    description: '8 less than last week'
  }
};

// Danger variant
export const Danger: Story = {
  args: {
    title: 'Overdue Tasks',
    value: 12,
    icon: 'pi pi-times-circle',
    variant: 'danger',
    size: 'medium',
    trend: 'up',
    trendValue: 5,
    subtitle: 'Critical',
    description: '5 more than yesterday'
  }
};

// Small size
export const Small: Story = {
  args: {
    title: 'Total Revenue',
    value: '$125K',
    icon: 'pi pi-dollar',
    variant: 'primary',
    size: 'small',
    trend: 'up',
    trendValue: '+15%',
    subtitle: 'This month'
  }
};

// Large size
export const Large: Story = {
  args: {
    title: 'Team Performance',
    value: 94,
    icon: 'pi pi-star',
    variant: 'success',
    size: 'large',
    trend: 'up',
    trendValue: '+2.5%',
    subtitle: 'Average score',
    description: 'Based on all metrics'
  }
};

// Without icon
export const WithoutIcon: Story = {
  args: {
    title: 'Active Users',
    value: 892,
    variant: 'info',
    size: 'medium',
    trend: 'up',
    trendValue: 67,
    subtitle: 'Online now',
    showIcon: false
  }
};

// Without trend
export const WithoutTrend: Story = {
  args: {
    title: 'Total Departments',
    value: 12,
    icon: 'pi pi-building',
    variant: 'secondary',
    size: 'medium',
    subtitle: 'Company wide',
    showTrend: false
  }
};

// With description
export const WithDescription: Story = {
  args: {
    title: 'Leave Balance',
    value: 15,
    icon: 'pi pi-calendar',
    variant: 'info',
    size: 'medium',
    trend: 'down',
    trendValue: -2,
    subtitle: 'Remaining days',
    description: '2 days used this month'
  }
};

// Loading state
export const Loading: Story = {
  args: {
    title: 'Processing Data',
    value: 0,
    icon: 'pi pi-spinner',
    variant: 'primary',
    size: 'medium',
    subtitle: 'Please wait',
    description: 'Loading statistics...',
    loading: true
  }
};

// HRM Examples
export const HrmTotalEmployees: Story = {
  args: {
    title: 'Total Employees',
    value: 1250,
    icon: 'pi pi-users',
    variant: 'primary',
    size: 'medium',
    trend: 'up',
    trendValue: 25,
    subtitle: 'Active workforce',
    description: '25 new hires this month'
  }
};

export const HrmAttendanceRate: Story = {
  args: {
    title: 'Attendance Rate',
    value: '96.5%',
    icon: 'pi pi-check-circle',
    variant: 'success',
    size: 'medium',
    trend: 'up',
    trendValue: '+2.3%',
    subtitle: 'This month',
    description: 'Above company average'
  }
};

export const HrmLeaveRequests: Story = {
  args: {
    title: 'Leave Requests',
    value: 45,
    icon: 'pi pi-calendar-times',
    variant: 'warning',
    size: 'medium',
    trend: 'down',
    trendValue: -8,
    subtitle: 'Pending approval',
    description: '8 fewer than last week'
  }
};

export const HrmPayrollTotal: Story = {
  args: {
    title: 'Monthly Payroll',
    value: '$425K',
    icon: 'pi pi-dollar',
    variant: 'info',
    size: 'medium',
    trend: 'up',
    trendValue: '+5.2%',
    subtitle: 'Current month',
    description: 'Includes bonuses and allowances'
  }
};

export const HrmTrainingCompleted: Story = {
  args: {
    title: 'Training Programs',
    value: 28,
    icon: 'pi pi-book',
    variant: 'success',
    size: 'medium',
    trend: 'up',
    trendValue: 5,
    subtitle: 'Completed this quarter',
    description: '5 new programs launched'
  }
};

export const HrmPerformanceScore: Story = {
  args: {
    title: 'Average Performance',
    value: 4.2,
    icon: 'pi pi-star',
    variant: 'primary',
    size: 'medium',
    trend: 'up',
    trendValue: '+0.3',
    subtitle: 'Out of 5.0',
    description: 'Quarterly review average'
  }
};

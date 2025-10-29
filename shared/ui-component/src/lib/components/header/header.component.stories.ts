import type { Meta, StoryObj } from '@storybook/angular';
import { HeaderComponent, UserProfile, NotificationItem } from './header.component';

const meta: Meta<HeaderComponent> = {
  title: 'Components/Header',
  component: HeaderComponent,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Main title displayed in header',
    },
    subtitle: {
      control: 'text',
      description: 'Optional subtitle displayed below title',
    },
    showSearch: {
      control: 'boolean',
      description: 'Show search input in header',
    },
    showNotifications: {
      control: 'boolean',
      description: 'Show notifications dropdown',
    },
    showUserMenu: {
      control: 'boolean',
      description: 'Show user menu dropdown',
    },
  },
};

export default meta;
type Story = StoryObj<HeaderComponent>;

// Sample user profile
const sampleUser: UserProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://via.placeholder.com/32',
  role: 'Administrator',
};

// Sample notifications
const sampleNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'New Message',
    message: 'You have received a new message from Sarah.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
    type: 'info',
  },
  {
    id: '2',
    title: 'Task Completed',
    message: 'Your project "Website Redesign" has been completed.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    type: 'success',
  },
  {
    id: '3',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur tonight at 2 AM.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
    type: 'warning',
  },
];

// Default story with all features
export const Default: Story = {
  args: {
    title: 'Dashboard',
    subtitle: 'Welcome back, John!',
    userProfile: sampleUser,
    notifications: sampleNotifications,
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
  },
};

// Minimal header with only title
export const Minimal: Story = {
  args: {
    title: 'Simple App',
    subtitle: '',
    showSearch: false,
    showNotifications: false,
    showUserMenu: false,
  },
};

// Header with search only
export const WithSearch: Story = {
  args: {
    title: 'Search App',
    subtitle: 'Find what you need',
    showSearch: true,
    showNotifications: false,
    showUserMenu: false,
  },
};

// Header with notifications only
export const WithNotifications: Story = {
  args: {
    title: 'Notifications',
    subtitle: 'Stay updated',
    notifications: sampleNotifications,
    showSearch: false,
    showNotifications: true,
    showUserMenu: false,
  },
};

// Header with user menu only
export const WithUserMenu: Story = {
  args: {
    title: 'User Profile',
    subtitle: 'Manage your account',
    userProfile: sampleUser,
    showSearch: false,
    showNotifications: false,
    showUserMenu: true,
  },
};

// Header with no notifications
export const NoNotifications: Story = {
  args: {
    title: 'Clean Dashboard',
    subtitle: 'No notifications to show',
    userProfile: sampleUser,
    notifications: [],
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
  },
};

// Header with many notifications
export const ManyNotifications: Story = {
  args: {
    title: 'Busy Dashboard',
    subtitle: 'Lots of activity',
    userProfile: sampleUser,
    notifications: [
      ...sampleNotifications,
      {
        id: '4',
        title: 'New Feature',
        message: 'Check out our latest feature release.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: false,
        type: 'info',
      },
      {
        id: '5',
        title: 'Error Alert',
        message: 'There was an issue with your last request.',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        read: false,
        type: 'error',
      },
      {
        id: '6',
        title: 'Reminder',
        message: 'Don\'t forget about the team meeting at 3 PM.',
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        read: true,
        type: 'warning',
      },
    ],
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
  },
};

import type { Meta, StoryObj } from '@storybook/angular';
import { FooterComponent } from './footer.component';

const meta: Meta<FooterComponent> = {
  title: 'Components/Footer',
  component: FooterComponent,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    companyName: {
      control: 'text',
      description: 'Company name displayed in footer',
    },
    description: {
      control: 'text',
      description: 'Company description text',
    },
    showNewsletter: {
      control: 'boolean',
      description: 'Show newsletter subscription section',
    },
    showSocialLinks: {
      control: 'boolean',
      description: 'Show social media links',
    },
    showBackToTop: {
      control: 'boolean',
      description: 'Show back to top button',
    },
  },
};

export default meta;
type Story = StoryObj<FooterComponent>;

// Default story with basic configuration
export const Default: Story = {
  args: {
    companyName: "test",
    description: 'Building amazing applications with modern technology.',
    showNewsletter: true,
    showSocialLinks: true,
    showBackToTop: true,
  },
};

// Minimal footer with only copyright
export const Minimal: Story = {
  args: {
    companyName: 'Simple Company',
    description: '',
    showNewsletter: false,
    showSocialLinks: false,
    showBackToTop: false,
    sections: [],
    socialLinks: [],
  },
};

// Footer with custom sections
export const WithCustomSections: Story = {
  args: {
    companyName: 'Custom Company',
    description: 'A company with custom footer sections.',
    sections: [
      {
        title: 'Products',
        links: [
          { label: 'Web App', url: '/web-app' },
          { label: 'Mobile App', url: '/mobile-app' },
          { label: 'API', url: '/api' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Documentation', url: '/docs' },
          { label: 'Tutorials', url: '/tutorials' },
          { label: 'Support', url: '/support' },
        ],
      },
    ],
  },
};

// Footer with custom social links
export const WithCustomSocialLinks: Story = {
  args: {
    companyName: 'Social Company',
    description: 'Connect with us on social media.',
    socialLinks: [
      { name: 'Twitter', icon: 'pi pi-twitter', url: '#', color: '#1da1f2' },
      { name: 'LinkedIn', icon: 'pi pi-linkedin', url: '#', color: '#0077b5' },
      { name: 'YouTube', icon: 'pi pi-youtube', url: '#', color: '#ff0000' },
    ],
  },
};

// Footer with additional links
export const WithAdditionalLinks: Story = {
  args: {
    companyName: 'Legal Company',
    description: 'A company with additional legal links.',
    additionalLinks: [
      { label: 'Privacy Policy', url: '/privacy' },
      { label: 'Terms of Service', url: '/terms' },
      { label: 'Cookie Policy', url: '/cookies' },
    ],
  },
};

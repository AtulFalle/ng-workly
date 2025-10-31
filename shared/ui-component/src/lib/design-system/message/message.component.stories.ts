import type { Meta, StoryObj } from '@storybook/angular';
import { MessageComponent } from './message.component';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { providePrimeNG } from 'primeng/config';
import { provideAnimations } from '@angular/platform-browser/animations';
import Aura from '@primeuix/themes/aura';
import { InputComponent } from '../input/input.component';

const meta: Meta<MessageComponent> = {
  title: 'Design System/Message',
  component: MessageComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        providePrimeNG({ theme: { preset: Aura } }),
      ],
    }),
    moduleMetadata({
      imports: [InputComponent],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'PrimeNG Message component wrapper for displaying inline messages. Used for form validation errors, success messages, and other inline notifications.',
      },
    },
  },
  argTypes: {
    severity: {
      control: 'select',
      options: ['success', 'info', 'warn', 'error', 'secondary', 'contrast'],
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'simple'],
    },
    size: {
      control: 'select',
      options: ['small', 'normal', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<MessageComponent>;

// Basic message
export const BasicMessage: Story = {
  args: {
    severity: 'info',
    text: 'Message Content',
  },
};

// Success message
export const SuccessMessage: Story = {
  args: {
    severity: 'success',
    text: 'Success Message',
  },
};

// Info message
export const InfoMessage: Story = {
  args: {
    severity: 'info',
    text: 'Info Message',
  },
};

// Warning message
export const WarningMessage: Story = {
  args: {
    severity: 'warn',
    text: 'Warning Message',
  },
};

// Error message
export const ErrorMessage: Story = {
  args: {
    severity: 'error',
    text: 'Error Message',
  },
};

// Message with custom content
export const MessageWithContent: Story = {
  render: () => ({
    template: `
      <lib-message severity="info">
        This is a message with custom content. You can add any HTML content here.
      </lib-message>
    `
  }),
};

// Outlined variant
export const OutlinedMessage: Story = {
  args: {
    severity: 'info',
    variant: 'outlined',
    text: 'Outlined Message',
  },
};

// Simple variant
export const SimpleMessage: Story = {
  args: {
    severity: 'error',
    variant: 'simple',
    text: 'Simple Message',
  },
};

// Size variants
export const SizeVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <lib-message severity="info" size="small" text="Small Message"></lib-message>
        <lib-message severity="info" size="normal" text="Normal Message"></lib-message>
        <lib-message severity="info" size="large" text="Large Message"></lib-message>
      </div>
    `
  }),
};

// Closable message
export const ClosableMessage: Story = {
  args: {
    severity: 'info',
    text: 'Closable Message',
    closable: true,
  },
};

// Message with icon
export const MessageWithIcon: Story = {
  args: {
    severity: 'success',
    icon: 'pi pi-check-circle',
    text: 'Success with Icon',
  },
};

// Form validation example
export const FormValidation: Story = {
  render: () => ({
    props: {
      username: '',
      phone: '',
      showUsernameError: true,
      showPhoneError: true,
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: var(--spacing-4); max-width: 400px; padding: 2rem;">
        <lib-message severity="error" icon="pi pi-times-circle">Validation Failed</lib-message>
        
        <div style="display: flex; flex-direction: column; gap: var(--spacing-2);">
          <lib-input 
            label="Username" 
            placeholder="Enter username"
            [invalid]="showUsernameError">
          </lib-input>
          @if (showUsernameError) {
            <lib-message severity="error" variant="simple" size="small">Username is required</lib-message>
          }
        </div>
        
        <div style="display: flex; flex-direction: column; gap: var(--spacing-2);">
          <lib-input 
            label="Phone" 
            placeholder="Enter phone number"
            [invalid]="showPhoneError">
          </lib-input>
          @if (showPhoneError) {
            <lib-message severity="error" variant="simple" size="small">Phone number is required</lib-message>
          }
        </div>
      </div>
    `
  }),
};

// All severities
export const AllSeverities: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <lib-message severity="success" text="Success Message"></lib-message>
        <lib-message severity="info" text="Info Message"></lib-message>
        <lib-message severity="warn" text="Warning Message"></lib-message>
        <lib-message severity="error" text="Error Message"></lib-message>
        <lib-message severity="secondary" text="Secondary Message"></lib-message>
        <lib-message severity="contrast" text="Contrast Message"></lib-message>
      </div>
    `
  }),
};

// All variants
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <lib-message severity="info" variant="default" text="Default Message"></lib-message>
        <lib-message severity="info" variant="outlined" text="Outlined Message"></lib-message>
        <lib-message severity="info" variant="simple" text="Simple Message"></lib-message>
      </div>
    `
  }),
};


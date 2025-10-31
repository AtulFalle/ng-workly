import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from './input.component';

const meta: Meta<InputComponent> = {
  title: 'Design System/Input',
  component: InputComponent,
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    type: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
  },
};

export const WithHint: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    type: 'password',
    hint: 'Must be at least 8 characters',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    invalid: true,
    errorMessage: 'Please enter a valid email address',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    iconLeft: 'pi pi-search',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => ({
    component: InputComponent,
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
        <lib-input label="Small" size="small" placeholder="Small input"></lib-input>
        <lib-input label="Medium" size="medium" placeholder="Medium input"></lib-input>
        <lib-input label="Large" size="large" placeholder="Large input"></lib-input>
      </div>
    `,
  }),
};


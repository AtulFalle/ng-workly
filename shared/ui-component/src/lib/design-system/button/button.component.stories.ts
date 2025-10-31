import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Design System/Button',
  component: ButtonComponent,
  argTypes: {
    severity: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    severity: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    severity: 'secondary',
  },
};

export const Success: Story = {
  args: {
    label: 'Success Button',
    severity: 'success',
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger Button',
    severity: 'danger',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Button with Icon',
    icon: 'pi pi-check',
    iconPos: 'left',
  },
};

export const Outlined: Story = {
  args: {
    label: 'Outlined Button',
    outlined: true,
  },
};

export const Text: Story = {
  args: {
    label: 'Text Button',
    text: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading Button',
    loading: true,
  },
};

export const Sizes: Story = {
  render: () => ({
    component: ButtonComponent,
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <lib-button label="Small" size="small"></lib-button>
        <lib-button label="Medium" size="medium"></lib-button>
        <lib-button label="Large" size="large"></lib-button>
      </div>
    `,
  }),
};


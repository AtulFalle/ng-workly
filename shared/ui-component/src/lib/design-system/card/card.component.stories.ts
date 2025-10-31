import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card.component';

const meta: Meta<CardComponent> = {
  title: 'Design System/Card',
  component: CardComponent,
  argTypes: {
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'Card Subtitle',
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-card [title]="title" [subtitle]="subtitle">
        <p>This is the card content. You can put any content here.</p>
      </lib-card>
    `,
  }),
};

export const WithHeader: Story = {
  args: {
    header: 'Card Header',
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-card [header]="header">
        <p>Card content with header.</p>
      </lib-card>
    `,
  }),
};

export const WithFooter: Story = {
  args: {
    title: 'Card with Footer',
    footer: 'Card Footer',
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-card [title]="title" [footer]="footer">
        <p>Card content with footer.</p>
      </lib-card>
    `,
  }),
};

export const NoPadding: Story = {
  args: {
    title: 'No Padding Card',
    padding: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-card [title]="title" [padding]="padding">
        <div style="padding: 1rem; background: var(--surface-100);">
          Custom padded content
        </div>
      </lib-card>
    `,
  }),
};

export const ShadowVariants: Story = {
  render: () => ({
    component: CardComponent,
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
        <lib-card title="Small Shadow" shadow="sm">Content</lib-card>
        <lib-card title="Medium Shadow" shadow="md">Content</lib-card>
        <lib-card title="Large Shadow" shadow="lg">Content</lib-card>
        <lib-card title="No Shadow" shadow="none">Content</lib-card>
      </div>
    `,
  }),
};


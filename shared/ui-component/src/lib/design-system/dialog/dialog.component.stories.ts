import type { Meta, StoryObj } from '@storybook/angular';
import { DialogComponent } from './dialog.component';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { providePrimeNG } from 'primeng/config';
import { provideAnimations } from '@angular/platform-browser/animations';
import Aura from '@primeuix/themes/aura';
import { signal } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';

const meta: Meta<DialogComponent> = {
  title: 'Design System/Dialog',
  component: DialogComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        providePrimeNG({ theme: { preset: Aura } }),
      ],
    }),
    moduleMetadata({
      imports: [ReactiveFormsModule, ButtonComponent, InputComponent],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A simple dialog component wrapper around PrimeNG dialog. Use two-way binding for visible state and project your own content.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DialogComponent>;

// Simple confirmation dialog
export const SimpleDialog: Story = {
  render: () => ({
    props: {
      visible: signal(false)
    },
    template: `
      <lib-button label="Show Dialog" (clickEvent)="visible.set(true)"></lib-button>
      
      <lib-dialog 
        header="Confirm Action" 
        [visible]="visible()"
        (visibleChange)="visible.set($event)"
        size="small">
        <p>Are you sure you want to proceed? This action cannot be undone.</p>
        
        <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1rem;">
          <lib-button label="Cancel" severity="secondary" (clickEvent)="visible.set(false)"></lib-button>
          <lib-button label="Confirm" severity="danger" (clickEvent)="visible.set(false)"></lib-button>
        </div>
      </lib-dialog>
    `
  }),
};

// Dialog with form
export const DialogWithForm: Story = {
  render: () => ({
    props: {
      visible: signal(false)
    },
    template: `
      <lib-button label="Edit Profile" (clickEvent)="visible.set(true)"></lib-button>
      
      <lib-dialog 
        header="Edit Profile" 
        [visible]="visible()"
        (visibleChange)="visible.set($event)"
        size="medium">
        <span style="color: var(--text-color-secondary); display: block; margin-bottom: 1rem;">
          Update your information.
        </span>
        
        <div style="margin-bottom: 1rem;">
          <lib-input 
            label="Username" 
            placeholder="Enter username"
            style="width: 100%;">
          </lib-input>
        </div>
        
        <div style="margin-bottom: 1rem;">
          <lib-input 
            label="Email" 
            type="email"
            placeholder="Enter email"
            style="width: 100%;">
          </lib-input>
        </div>
        
        <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1rem;">
          <lib-button label="Cancel" severity="secondary" (clickEvent)="visible.set(false)"></lib-button>
          <lib-button label="Save" (clickEvent)="visible.set(false)"></lib-button>
        </div>
      </lib-dialog>
    `
  }),
};

// Alert dialog
export const AlertDialog: Story = {
  render: () => ({
    props: {
      visible: signal(false)
    },
    template: `
      <lib-button label="Show Alert" (clickEvent)="visible.set(true)"></lib-button>
      
      <lib-dialog 
        header="Information" 
        [visible]="visible()"
        (visibleChange)="visible.set($event)"
        size="small">
        <p>Your changes have been saved successfully.</p>
        
        <div style="display: flex; justify-content: center; margin-top: 1rem;">
          <lib-button label="OK" (clickEvent)="visible.set(false)"></lib-button>
        </div>
      </lib-dialog>
    `
  }),
};

// Large dialog
export const LargeDialog: Story = {
  render: () => ({
    props: {
      visible: signal(false)
    },
    template: `
      <lib-button label="Open Large Dialog" (clickEvent)="visible.set(true)"></lib-button>
      
      <lib-dialog 
        header="Large Dialog" 
        [visible]="visible()"
        (visibleChange)="visible.set($event)"
        size="large">
        <p>This is a large dialog (900px max width). Perfect for complex forms and detailed content.</p>
        <p>You can place any content here using standard Angular template syntax.</p>
        
        <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1rem;">
          <lib-button label="Close" (clickEvent)="visible.set(false)"></lib-button>
        </div>
      </lib-dialog>
    `
  }),
};

// Non-closable dialog
export const NonClosableDialog: Story = {
  render: () => ({
    props: {
      visible: signal(false)
    },
    template: `
      <lib-button label="Open Non-Closable Dialog" (clickEvent)="visible.set(true)"></lib-button>
      
      <lib-dialog 
        header="Required Action" 
        [visible]="visible()"
        (visibleChange)="visible.set($event)"
        [closable]="false"
        [dismissableMask]="false"
        [closeOnEscape]="false"
        size="medium">
        <p>This dialog cannot be closed until you complete the required action.</p>
        
        <div style="display: flex; justify-content: center; margin-top: 1rem;">
          <lib-button label="Complete Action" (clickEvent)="visible.set(false)"></lib-button>
        </div>
      </lib-dialog>
    `
  }),
};

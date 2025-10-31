import type { Meta, StoryObj } from '@storybook/angular';
import { ToastComponent } from './toast.component';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { providePrimeNG } from 'primeng/config';
import { provideAnimations } from '@angular/platform-browser/animations';
import Aura from '@primeuix/themes/aura';
import { MessageService } from 'primeng/api';
import { ToastService } from './toast.service';
import { ButtonComponent } from '../button/button.component';
import { Component, inject } from '@angular/core';

// Wrapper component to demonstrate ToastService usage
@Component({
  selector: 'story-toast-demo',
  imports: [ToastComponent, ButtonComponent],
  template: `
    <lib-toast></lib-toast>
    
    <div style="display: flex; flex-direction: column; gap: 1rem; padding: 2rem;">
      <h2>Toast Examples</h2>
      <p>Click the buttons below to see different toast types:</p>
      
      <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
        <lib-button label="Success Toast" severity="success" (clickEvent)="showSuccess()"></lib-button>
        <lib-button label="Info Toast" severity="info" (clickEvent)="showInfo()"></lib-button>
        <lib-button label="Warning Toast" severity="warning" (clickEvent)="showWarning()"></lib-button>
        <lib-button label="Error Toast" severity="danger" (clickEvent)="showError()"></lib-button>
        <lib-button label="Sticky Toast" severity="primary" (clickEvent)="showSticky()"></lib-button>
        <lib-button label="Long Toast" severity="secondary" (clickEvent)="showLong()"></lib-button>
        <lib-button label="Clear All" severity="secondary" (clickEvent)="clearAll()"></lib-button>
      </div>
    </div>
  `
})
class ToastDemoComponent {
  private toastService = inject(ToastService);

  showSuccess(): void {
    this.toastService.success('Success!', 'Your changes have been saved successfully.');
  }

  showInfo(): void {
    this.toastService.info('Information', 'Here is some useful information.');
  }

  showWarning(): void {
    this.toastService.warn('Warning', 'Please review your changes before proceeding.');
  }

  showError(): void {
    this.toastService.error('Error', 'Something went wrong. Please try again.');
  }

  showSticky(): void {
    this.toastService.info('Sticky Toast', 'This toast will not auto-dismiss.', { sticky: true });
  }

  showLong(): void {
    this.toastService.info(
      'Long Message Toast',
      'This is a longer message that demonstrates how the toast handles multiple lines of text and provides a good reading experience.',
      { life: 5000 }
    );
  }

  clearAll(): void {
    this.toastService.clear();
  }
}

const meta: Meta<ToastComponent> = {
  title: 'Design System/Toast',
  component: ToastComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        providePrimeNG({ theme: { preset: Aura } }),
        MessageService, // Shared MessageService for all stories
        ToastService
      ],
    }),
    moduleMetadata({
      imports: [ButtonComponent, ToastDemoComponent, ToastComponent],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'PrimeNG toast component wrapper with standardized top-right positioning. Use ToastService to trigger toasts programmatically.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ToastComponent>;

// Basic toast component structure
export const BasicStructure: Story = {
  render: () => ({
    component: ToastComponent,
    template: `
      <lib-toast></lib-toast>
      <p style="padding: 2rem;">
        The toast component has been added. Use ToastService to trigger toasts.
        See the Interactive Examples story to see it in action.
      </p>
    `
  }),
};

// Interactive examples
export const InteractiveExamples: Story = {
  render: () => ({
    component: ToastDemoComponent,
    template: '<story-toast-demo></story-toast-demo>'
  }),
};

// Success toast example
export const SuccessToast: Story = {
  render: () => ({
    component: ToastDemoComponent,
    template: `
      <lib-toast></lib-toast>
      <div style="padding: 2rem;">
        <h3>Success Toast</h3>
        <p>Use ToastService.success() to show a success toast:</p>
        <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px;">
this.toastService.success(
  'Success!',
  'Your changes have been saved successfully.'
);
        </pre>
        <lib-button 
          label="Try Success Toast" 
          severity="success"
          (clickEvent)="showSuccess()">
        </lib-button>
      </div>
    `
  }),
};

// Info toast example
export const InfoToast: Story = {
  render: () => ({
    component: ToastDemoComponent,
    template: `
      <lib-toast></lib-toast>
      <div style="padding: 2rem;">
        <h3>Info Toast</h3>
        <p>Use ToastService.info() to show an info toast:</p>
        <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px;">
this.toastService.info(
  'Information',
  'Here is some useful information.'
);
        </pre>
        <lib-button 
          label="Try Info Toast" 
          severity="info"
          (clickEvent)="showInfo()">
        </lib-button>
      </div>
    `
  }),
};

// Warning toast example
export const WarningToast: Story = {
  render: () => ({
    component: ToastDemoComponent,
    template: `
      <lib-toast></lib-toast>
      <div style="padding: 2rem;">
        <h3>Warning Toast</h3>
        <p>Use ToastService.warn() to show a warning toast:</p>
        <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px;">
this.toastService.warn(
  'Warning',
  'Please review your changes before proceeding.'
);
        </pre>
        <lib-button 
          label="Try Warning Toast" 
          severity="warning"
          (clickEvent)="showWarning()">
        </lib-button>
      </div>
    `
  }),
};

// Error toast example
export const ErrorToast: Story = {
  render: () => ({
    component: ToastDemoComponent,
    template: `
      <lib-toast></lib-toast>
      <div style="padding: 2rem;">
        <h3>Error Toast</h3>
        <p>Use ToastService.error() to show an error toast:</p>
        <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px;">
this.toastService.error(
  'Error',
  'Something went wrong. Please try again.'
);
        </pre>
        <lib-button 
          label="Try Error Toast" 
          severity="danger"
          (clickEvent)="showError()">
        </lib-button>
      </div>
    `
  }),
};

// Sticky toast example
export const StickyToast: Story = {
  render: () => ({
    component: ToastDemoComponent,
    template: `
      <lib-toast></lib-toast>
      <div style="padding: 2rem;">
        <h3>Sticky Toast</h3>
        <p>Use sticky option to prevent auto-dismiss:</p>
        <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px;">
this.toastService.info(
  'Sticky Toast',
  'This toast will not auto-dismiss.',
  &#123; sticky: true &#125;
);
        </pre>
        <lib-button 
          label="Try Sticky Toast" 
          severity="primary"
          (clickEvent)="showSticky()">
        </lib-button>
      </div>
    `
  }),
};

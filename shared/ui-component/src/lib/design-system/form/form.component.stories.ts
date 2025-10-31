import type { Meta, StoryObj } from '@storybook/angular';
import { FormComponent } from './form.component';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<FormComponent> = {
  title: 'Design System/Form',
  component: FormComponent,
  decorators: [
    moduleMetadata({
      imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
    }),
  ],
  argTypes: {
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal', 'inline'],
    },
    spacing: {
      control: 'select',
      options: ['none', 'compact', 'comfortable'],
    },
  },
};

export default meta;
type Story = StoryObj<FormComponent>;

export const Default: Story = {
  render: () => {
    const fb = new FormBuilder();
    const form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    return {
      component: FormComponent,
      props: {
        formGroup: form,
        title: 'Login Form',
        subtitle: 'Enter your credentials to continue',
      },
      template: `
        <lib-form [formGroup]="formGroup" [title]="title" [subtitle]="subtitle">
          <lib-input
            label="Email"
            type="email"
            placeholder="Enter your email"
            formControlName="email">
          </lib-input>
          
          <lib-input
            label="Password"
            type="password"
            placeholder="Enter your password"
            formControlName="password">
          </lib-input>

          <ng-container formActions>
            <lib-button label="Cancel" severity="secondary" (clickEvent)="formGroup.reset()"></lib-button>
            <lib-button label="Submit" type="submit" severity="primary"></lib-button>
          </ng-container>
        </lib-form>
      `,
    };
  },
};

export const ContactForm: Story = {
  render: () => {
    const fb = new FormBuilder();
    const form = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });

    return {
      component: FormComponent,
      props: {
        formGroup: form,
        title: 'Contact Us',
      },
      template: `
        <lib-form [formGroup]="formGroup" [title]="title">
          <lib-input
            label="Name"
            placeholder="Your name"
            formControlName="name">
          </lib-input>
          
          <lib-input
            label="Email"
            type="email"
            placeholder="your.email@example.com"
            formControlName="email">
          </lib-input>
          
          <lib-input
            label="Message"
            placeholder="Your message"
            formControlName="message">
          </lib-input>

          <ng-container formActions>
            <lib-button label="Send Message" type="submit" severity="primary"></lib-button>
          </ng-container>
        </lib-form>
      `,
    };
  },
};

export const HorizontalLayout: Story = {
  render: () => {
    const fb = new FormBuilder();
    const form = fb.group({
      firstName: [''],
      lastName: [''],
    });

    return {
      component: FormComponent,
      props: {
        formGroup: form,
        layout: 'horizontal',
      },
      template: `
        <lib-form [formGroup]="formGroup" layout="horizontal">
          <lib-input label="First Name" formControlName="firstName"></lib-input>
          <lib-input label="Last Name" formControlName="lastName"></lib-input>
        </lib-form>
      `,
    };
  },
};


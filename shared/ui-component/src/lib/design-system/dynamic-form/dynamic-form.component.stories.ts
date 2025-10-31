import type { Meta, StoryObj } from '@storybook/angular';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormConfig } from './dynamic-form.types';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

const meta: Meta<DynamicFormComponent> = {
  title: 'Design System/Dynamic Form',
  component: DynamicFormComponent,
  decorators: [
    applicationConfig({
      providers: [providePrimeNG({ theme: { preset: Aura } })],
    }),
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A dynamic form component that renders forms based on JSON configuration. Supports multiple input types, layouts, and validation rules.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DynamicFormComponent>;

// Simple text input form
export const SimpleForm: Story = {
  args: {
    config: {
      title: 'User Registration',
      subtitle: 'Fill out the form to create your account',
      layout: 'vertical',
      controls: [
        {
          name: 'firstName',
          type: 'text',
          label: 'First Name',
          placeholder: 'Enter your first name',
          required: true,
          validators: [
            { type: 'required', message: 'First name is required' },
            { type: 'minLength', value: 2, message: 'First name must be at least 2 characters' }
          ]
        },
        {
          name: 'lastName',
          type: 'text',
          label: 'Last Name',
          placeholder: 'Enter your last name',
          required: true,
          validators: [
            { type: 'required', message: 'Last name is required' }
          ]
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email Address',
          placeholder: 'your.email@example.com',
          required: true,
          validators: [
            { type: 'required', message: 'Email is required' },
            { type: 'email', message: 'Please enter a valid email address' }
          ]
        }
      ]
    } as DynamicFormConfig
  },
};

// Form with grid layout
export const GridLayoutForm: Story = {
  args: {
    config: {
      title: 'Contact Information',
      layout: 'grid',
      gridColumns: 12,
      controls: [
        {
          name: 'firstName',
          type: 'text',
          label: 'First Name',
          placeholder: 'First name',
          layout: { columnSpan: 6 },
          required: true,
          validators: [{ type: 'required' }]
        },
        {
          name: 'lastName',
          type: 'text',
          label: 'Last Name',
          placeholder: 'Last name',
          layout: { columnSpan: 6 },
          required: true,
          validators: [{ type: 'required' }]
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          placeholder: 'email@example.com',
          layout: { columnSpan: 12 },
          required: true,
          validators: [
            { type: 'required' },
            { type: 'email' }
          ]
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
          placeholder: '(123) 456-7890',
          layout: { columnSpan: 12 },
          hint: 'Optional'
        }
      ]
    } as DynamicFormConfig
  },
};

// Form with different input types
export const MixedInputTypes: Story = {
  args: {
    config: {
      title: 'Account Setup',
      layout: 'vertical',
      spacing: 'comfortable',
      controls: [
        {
          name: 'username',
          type: 'text',
          label: 'Username',
          placeholder: 'Choose a username',
          required: true,
          showClear: true,
          validators: [
            { type: 'required' },
            { type: 'minLength', value: 3, message: 'Username must be at least 3 characters' }
          ]
        },
        {
          name: 'password',
          type: 'password',
          label: 'Password',
          placeholder: 'Enter your password',
          required: true,
          hint: 'Must be at least 8 characters',
          validators: [
            { type: 'required' },
            { type: 'minLength', value: 8, message: 'Password must be at least 8 characters' }
          ]
        },
        {
          name: 'age',
          type: 'number',
          label: 'Age',
          placeholder: 'Enter your age',
          validators: [
            { type: 'min', value: 18, message: 'You must be at least 18 years old' },
            { type: 'max', value: 120, message: 'Please enter a valid age' }
          ]
        }
      ]
    } as DynamicFormConfig
  },
};

// Form with ordered fields
export const OrderedFields: Story = {
  args: {
    config: {
      title: 'Ordered Form Fields',
      layout: 'vertical',
      controls: [
        {
          name: 'field3',
          type: 'text',
          label: 'Field 3 (should appear third)',
          layout: { order: 3 }
        },
        {
          name: 'field1',
          type: 'text',
          label: 'Field 1 (should appear first)',
          layout: { order: 1 }
        },
        {
          name: 'field2',
          type: 'text',
          label: 'Field 2 (should appear second)',
          layout: { order: 2 }
        }
      ]
    } as DynamicFormConfig
  },
};

// Compact form
export const CompactForm: Story = {
  args: {
    config: {
      title: 'Quick Contact',
      layout: 'vertical',
      spacing: 'compact',
      controls: [
        {
          name: 'name',
          type: 'text',
          label: 'Name',
          placeholder: 'Your name',
          required: true
        },
        {
          name: 'message',
          type: 'text',
          label: 'Message',
          placeholder: 'Your message'
        }
      ]
    } as DynamicFormConfig
  },
};

// Registration form example
export const RegistrationForm: Story = {
  args: {
    config: {
      title: 'Create Your Account',
      subtitle: 'Join our platform today and start your journey',
      layout: 'vertical',
      spacing: 'comfortable',
      controls: [
        {
          name: 'username',
          type: 'text',
          label: 'Username',
          placeholder: 'Choose a username',
          required: true,
          showClear: true,
          layout: { order: 1 },
          validators: [
            { type: 'required', message: 'Username is required' },
            { type: 'minLength', value: 3, message: 'Username must be at least 3 characters' },
            { type: 'maxLength', value: 20, message: 'Username cannot exceed 20 characters' },
            { 
              type: 'pattern', 
              value: '^[a-zA-Z0-9_]+$', 
              message: 'Username can only contain letters, numbers, and underscores' 
            }
          ]
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email Address',
          placeholder: 'your.email@example.com',
          required: true,
          layout: { order: 2 },
          hint: 'We\'ll never share your email with anyone else',
          validators: [
            { type: 'required', message: 'Email is required' },
            { type: 'email', message: 'Please enter a valid email address' }
          ]
        },
        {
          name: 'password',
          type: 'password',
          label: 'Password',
          placeholder: 'Create a strong password',
          required: true,
          layout: { order: 3 },
          hint: 'Must be at least 8 characters with letters and numbers',
          validators: [
            { type: 'required', message: 'Password is required' },
            { type: 'minLength', value: 8, message: 'Password must be at least 8 characters' },
            { 
              type: 'pattern', 
              value: '^(?=.*[A-Za-z])(?=.*\\d)', 
              message: 'Password must contain at least one letter and one number' 
            }
          ]
        },
        {
          name: 'confirmPassword',
          type: 'password',
          label: 'Confirm Password',
          placeholder: 'Re-enter your password',
          required: true,
          layout: { order: 4 },
          validators: [
            { type: 'required', message: 'Please confirm your password' }
          ]
        }
      ]
    } as DynamicFormConfig
  },
};

// User profile form with grid layout
export const UserProfileForm: Story = {
  args: {
    config: {
      title: 'User Profile',
      subtitle: 'Update your personal information',
      layout: 'grid',
      gridColumns: 12,
      spacing: 'comfortable',
      controls: [
        {
          name: 'firstName',
          type: 'text',
          label: 'First Name',
          placeholder: 'John',
          required: true,
          layout: { columnSpan: 6, order: 1 },
          validators: [
            { type: 'required', message: 'First name is required' },
            { type: 'minLength', value: 2, message: 'First name must be at least 2 characters' }
          ]
        },
        {
          name: 'lastName',
          type: 'text',
          label: 'Last Name',
          placeholder: 'Doe',
          required: true,
          layout: { columnSpan: 6, order: 2 },
          validators: [
            { type: 'required', message: 'Last name is required' },
            { type: 'minLength', value: 2, message: 'Last name must be at least 2 characters' }
          ]
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email Address',
          placeholder: 'john.doe@example.com',
          required: true,
          layout: { columnSpan: 12, order: 3 },
          validators: [
            { type: 'required', message: 'Email is required' },
            { type: 'email', message: 'Please enter a valid email address' }
          ]
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
          placeholder: '(555) 123-4567',
          layout: { columnSpan: 6, order: 4 },
          hint: 'Optional'
        },
        {
          name: 'age',
          type: 'number',
          label: 'Age',
          placeholder: 'Enter your age',
          layout: { columnSpan: 6, order: 5 },
          validators: [
            { type: 'min', value: 18, message: 'You must be at least 18 years old' },
            { type: 'max', value: 120, message: 'Please enter a valid age' }
          ]
        }
      ]
    } as DynamicFormConfig
  },
};

// Contact form with different field types
export const ContactForm: Story = {
  args: {
    config: {
      title: 'Get in Touch',
      subtitle: 'Fill out the form below and we\'ll get back to you as soon as possible',
      layout: 'vertical',
      spacing: 'comfortable',
      controls: [
        {
          name: 'name',
          type: 'text',
          label: 'Full Name',
          placeholder: 'John Doe',
          required: true,
          layout: { order: 1 },
          validators: [
            { type: 'required', message: 'Name is required' },
            { type: 'minLength', value: 2, message: 'Name must be at least 2 characters' }
          ]
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          placeholder: 'your.email@example.com',
          required: true,
          layout: { order: 2 },
          showClear: true,
          validators: [
            { type: 'required', message: 'Email is required' },
            { type: 'email', message: 'Please enter a valid email address' }
          ]
        },
        {
          name: 'subject',
          type: 'text',
          label: 'Subject',
          placeholder: 'What is this regarding?',
          required: true,
          layout: { order: 3 },
          validators: [
            { type: 'required', message: 'Subject is required' },
            { type: 'minLength', value: 3, message: 'Subject must be at least 3 characters' }
          ]
        },
        {
          name: 'message',
          type: 'text',
          label: 'Message',
          placeholder: 'Tell us more...',
          required: true,
          layout: { order: 4 },
          hint: 'Minimum 10 characters',
          validators: [
            { type: 'required', message: 'Message is required' },
            { type: 'minLength', value: 10, message: 'Message must be at least 10 characters' },
            { type: 'maxLength', value: 500, message: 'Message cannot exceed 500 characters' }
          ]
        }
      ]
    } as DynamicFormConfig
  },
};

// Horizontal layout form
export const HorizontalLayoutForm: Story = {
  args: {
    config: {
      title: 'Search Filters',
      subtitle: 'Adjust your search criteria',
      layout: 'horizontal',
      spacing: 'compact',
      controls: [
        {
          name: 'keyword',
          type: 'text',
          label: 'Keyword',
          placeholder: 'Search...',
          showClear: true,
          layout: { order: 1 }
        },
        {
          name: 'category',
          type: 'text',
          label: 'Category',
          placeholder: 'Select category',
          layout: { order: 2 }
        },
        {
          name: 'minPrice',
          type: 'number',
          label: 'Min Price',
          placeholder: '0',
          layout: { order: 3 },
          validators: [
            { type: 'min', value: 0, message: 'Price must be positive' }
          ]
        },
        {
          name: 'maxPrice',
          type: 'number',
          label: 'Max Price',
          placeholder: '1000',
          layout: { order: 4 },
          validators: [
            { type: 'min', value: 0, message: 'Price must be positive' }
          ]
        }
      ]
    } as DynamicFormConfig
  },
};

// Form with different field spacing variants
export const FieldSpacingVariants: Story = {
  args: {
    config: {
      title: 'Field Spacing Variants',
      subtitle: 'Demonstrates different spacing options for individual fields',
      layout: 'vertical',
      spacing: 'comfortable',
      controls: [
        {
          name: 'fieldNone',
          type: 'text',
          label: 'No Spacing',
          placeholder: 'This field has no padding',
          layout: { order: 1, spacing: 'none' },
          hint: 'spacing: none (0px padding)'
        },
        {
          name: 'fieldCompact',
          type: 'text',
          label: 'Compact Spacing',
          placeholder: 'This field has compact padding',
          layout: { order: 2, spacing: 'compact' },
          hint: 'spacing: compact (4px padding)'
        },
        {
          name: 'fieldComfortable',
          type: 'text',
          label: 'Comfortable Spacing',
          placeholder: 'This field has comfortable padding (default)',
          layout: { order: 3, spacing: 'comfortable' },
          hint: 'spacing: comfortable (8px padding) - default'
        },
        {
          name: 'fieldGenerous',
          type: 'text',
          label: 'Generous Spacing',
          placeholder: 'This field has generous padding',
          layout: { order: 4, spacing: 'generous' },
          hint: 'spacing: generous (12px padding)'
        }
      ]
    } as DynamicFormConfig
  },
};

// Form with mixed spacing in grid layout
export const MixedSpacingGridForm: Story = {
  args: {
    config: {
      title: 'Mixed Spacing in Grid Layout',
      subtitle: 'Each field can have its own spacing while maintaining grid structure',
      layout: 'grid',
      gridColumns: 12,
      spacing: 'comfortable',
      controls: [
        {
          name: 'firstName',
          type: 'text',
          label: 'First Name',
          placeholder: 'John',
          layout: { columnSpan: 6, order: 1, spacing: 'comfortable' },
          required: true
        },
        {
          name: 'lastName',
          type: 'text',
          label: 'Last Name',
          placeholder: 'Doe',
          layout: { columnSpan: 6, order: 2, spacing: 'comfortable' },
          required: true
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email Address',
          placeholder: 'john.doe@example.com',
          layout: { columnSpan: 12, order: 3, spacing: 'generous' },
          required: true,
          hint: 'This field has generous spacing (12px padding)',
          validators: [
            { type: 'required' },
            { type: 'email' }
          ]
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
          placeholder: '(555) 123-4567',
          layout: { columnSpan: 6, order: 4, spacing: 'compact' },
          hint: 'Compact spacing (4px padding)'
        },
        {
          name: 'address',
          type: 'text',
          label: 'Address',
          placeholder: '123 Main St',
          layout: { columnSpan: 6, order: 5, spacing: 'compact' },
          hint: 'Compact spacing (4px padding)'
        }
      ]
    } as DynamicFormConfig
  },
};

// Compact form with individual field spacing
export const CompactFormWithFieldSpacing: Story = {
  args: {
    config: {
      title: 'Compact Form with Custom Field Spacing',
      subtitle: 'Form-level compact spacing with field-specific adjustments',
      layout: 'vertical',
      spacing: 'compact',
      controls: [
        {
          name: 'username',
          type: 'text',
          label: 'Username',
          placeholder: 'Enter username',
          layout: { order: 1, spacing: 'none' },
          hint: 'No padding - minimal space'
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          placeholder: 'email@example.com',
          layout: { order: 2, spacing: 'comfortable' },
          hint: 'Comfortable padding - more breathing room',
          required: true
        },
        {
          name: 'password',
          type: 'password',
          label: 'Password',
          placeholder: 'Enter password',
          layout: { order: 3, spacing: 'comfortable' },
          required: true
        }
      ]
    } as DynamicFormConfig
  },
};

// Form demonstrating spacing hierarchy
export const SpacingHierarchy: Story = {
  args: {
    config: {
      title: 'Spacing Hierarchy',
      subtitle: 'Shows how spacing scales from none to generous',
      layout: 'vertical',
      spacing: 'comfortable',
      controls: [
        {
          name: 'level1',
          type: 'text',
          label: 'Level 1: No Spacing',
          placeholder: '0px padding',
          layout: { order: 1, spacing: 'none' }
        },
        {
          name: 'level2',
          type: 'text',
          label: 'Level 2: Compact Spacing',
          placeholder: '4px padding',
          layout: { order: 2, spacing: 'compact' }
        },
        {
          name: 'level3',
          type: 'text',
          label: 'Level 3: Comfortable Spacing',
          placeholder: '8px padding (default)',
          layout: { order: 3, spacing: 'comfortable' }
        },
        {
          name: 'level4',
          type: 'text',
          label: 'Level 4: Generous Spacing',
          placeholder: '12px padding',
          layout: { order: 4, spacing: 'generous' }
        }
      ]
    } as DynamicFormConfig
  },
};


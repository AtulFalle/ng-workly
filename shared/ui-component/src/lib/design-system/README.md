# Design System Components

Reusable UI components built on PrimeNG, following Angular best practices and the Workly design system.

## Components

### Button Component (`lib-button`)

A flexible button component with multiple variants, sizes, and states.

```typescript
import { ButtonComponent } from '@workly/ui-component';

@Component({
  imports: [ButtonComponent],
  template: `
    <lib-button
      label="Click Me"
      severity="primary"
      size="medium"
      (clickEvent)="handleClick($event)">
    </lib-button>
  `
})
```

**Props:**
- `label`: Button text
- `severity`: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger'
- `size`: 'small' | 'medium' | 'large'
- `icon`: Icon class (e.g., 'pi pi-check')
- `iconPos`: 'left' | 'right'
- `outlined`: Boolean for outlined style
- `text`: Boolean for text button
- `disabled`: Boolean
- `loading`: Boolean
- `rounded`: Boolean
- `raised`: Boolean
- `link`: Boolean

### Input Component (`lib-input`)

A form input component with validation, icons, and error handling.

```typescript
import { InputComponent } from '@workly/ui-component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [InputComponent, ReactiveFormsModule],
  template: `
    <lib-input
      label="Email"
      type="email"
      placeholder="Enter your email"
      [invalid]="emailControl.invalid"
      [errorMessage]="getErrorMessage('email')"
      formControlName="email">
    </lib-input>
  `
})
```

**Props:**
- `label`: Label text
- `type`: Input type (text, email, password, etc.)
- `placeholder`: Placeholder text
- `size`: 'small' | 'medium' | 'large'
- `disabled`: Boolean
- `readonly`: Boolean
- `required`: Boolean
- `invalid`: Boolean
- `errorMessage`: Error message text
- `hint`: Hint text
- `iconLeft`: Left icon class
- `iconRight`: Right icon class
- `showClear`: Show clear button

**Note:** Implements `ControlValueAccessor` for use with reactive forms.

### Card Component (`lib-card`)

A card container component for organizing content.

```typescript
import { CardComponent } from '@workly/ui-component';

@Component({
  imports: [CardComponent],
  template: `
    <lib-card
      title="Card Title"
      subtitle="Card Subtitle"
      shadow="md"
      [elevation]="true">
      <p>Card content goes here</p>
    </lib-card>
  `
})
```

**Props:**
- `title`: Card title
- `subtitle`: Card subtitle
- `header`: Header content (string)
- `footer`: Footer content (string)
- `elevation`: Boolean for hover elevation
- `padding`: Boolean for padding
- `shadow`: 'none' | 'sm' | 'md' | 'lg'
- `border`: Boolean for border

### Form Component (`lib-form`)

A form wrapper component with layout options and validation support.

```typescript
import { FormComponent, InputComponent, ButtonComponent } from '@workly/ui-component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [FormComponent, InputComponent, ButtonComponent, ReactiveFormsModule],
  template: `
    <lib-form
      [formGroup]="myForm"
      title="Contact Form"
      subtitle="Fill out the form below"
      layout="vertical"
      (submit)="onSubmit($event)">
      
      <lib-input
        label="Name"
        formControlName="name">
      </lib-input>
      
      <lib-input
        label="Email"
        type="email"
        formControlName="email">
      </lib-input>

      <ng-container formActions>
        <lib-button label="Submit" type="submit" severity="primary"></lib-button>
        <lib-button label="Reset" severity="secondary" (clickEvent)="myForm.reset()"></lib-button>
      </ng-container>
    </lib-form>
  `
})
export class MyComponent {
  fb = inject(FormBuilder);
  myForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit(form: FormGroup): void {
    console.log('Form submitted:', form.value);
  }
}
```

**Props:**
- `formGroup`: Reactive FormGroup instance
- `title`: Form title
- `subtitle`: Form subtitle
- `layout`: 'vertical' | 'horizontal' | 'inline'
- `spacing`: 'none' | 'compact' | 'comfortable'
- `showLabels`: Boolean
- `showValidation`: Boolean

**Events:**
- `submit`: Emits FormGroup on valid submission
- `reset`: Emits on form reset

## Usage Examples

### Basic Form

```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent, InputComponent, ButtonComponent } from '@workly/ui-component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormComponent, InputComponent, ButtonComponent, ReactiveFormsModule],
  template: `
    <lib-form [formGroup]="loginForm" title="Login" (submit)="onLogin($event)">
      <lib-input
        label="Email"
        type="email"
        formControlName="email"
        [required]="true">
      </lib-input>
      
      <lib-input
        label="Password"
        type="password"
        formControlName="password"
        [required]="true">
      </lib-input>

      <ng-container formActions>
        <lib-button label="Login" type="submit" severity="primary"></lib-button>
      </ng-container>
    </lib-form>
  `
})
export class LoginComponent {
  fb = inject(FormBuilder);
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onLogin(form: FormGroup): void {
    // Handle login
  }
}
```

### Card with Content

```typescript
import { CardComponent, ButtonComponent } from '@workly/ui-component';

@Component({
  imports: [CardComponent, ButtonComponent],
  template: `
    <lib-card title="User Profile" shadow="md">
      <p>User information goes here</p>
      
      <ng-container formActions>
        <lib-button label="Edit" severity="primary"></lib-button>
        <lib-button label="Delete" severity="danger"></lib-button>
      </ng-container>
    </lib-card>
  `
})
```

## Design System Integration

All components use the Workly design system CSS variables:

- Colors: `--primary-*`, `--success-*`, `--error-*`, etc.
- Spacing: `--spacing-*`
- Typography: `--font-size-*`, `--font-weight-*`
- Borders: `--border-radius-*`
- Shadows: `--shadow-*`

## Dark Theme Support

All components automatically support dark theme when `.p-dark` class is applied to the root element.

## Storybook

Each component includes Storybook stories for interactive development:

- View stories: `nx storybook ui-component`
- Stories location: `shared/ui-component/src/lib/design-system/*/*.stories.ts`


# Dialog Components

This module provides three types of dialog components based on PrimeNG:

1. **DialogComponent** - Custom configurable dialog with JSON configuration
2. **ConfirmDialogComponent** - PrimeNG confirmation dialog wrapper
3. **DialogService** - Service for programmatic dynamic dialogs

## DialogComponent

A fully configurable dialog component that supports text messages, forms, and custom content.

### Usage

```typescript
import { DialogComponent } from '@workly/ui-component';
import { DialogConfig } from '@workly/ui-component';
import { signal } from '@angular/core';

@Component({
  imports: [DialogComponent],
  template: `
    <lib-dialog
      [config]="dialogConfig"
      [visible]="dialogVisible()"
      (close)="onClose($event)"
      (buttonClick)="onButtonClick($event)">
    </lib-dialog>
  `
})
export class MyComponent {
  dialogVisible = signal(false);
  
  dialogConfig: DialogConfig = {
    title: 'Confirm Action',
    subtitle: 'Are you sure?',
    size: 'small',
    content: {
      type: 'text',
      text: 'This action cannot be undone.'
    },
    footer: {
      buttons: [
        { label: 'Cancel', severity: 'secondary', action: 'cancel' },
        { label: 'Confirm', severity: 'primary', action: 'confirm' }
      ]
    }
  };

  onClose(result: DialogResult) {
    this.dialogVisible.set(false);
  }

  onButtonClick(result: DialogResult) {
    if (result.action === 'confirm') {
      // Handle confirm action
    }
  }
}
```

### With Dynamic Form

```typescript
const formDialogConfig: DialogConfig = {
  title: 'Add User',
  size: 'medium',
  content: {
    type: 'form',
    formConfig: {
      layout: 'vertical',
      controls: [
        {
          name: 'firstName',
          type: 'text',
          label: 'First Name',
          required: true
        }
      ]
    }
  },
  footer: {
    buttons: [
      { label: 'Cancel', severity: 'secondary' },
      { label: 'Save', severity: 'primary', action: 'save' }
    ]
  }
};
```

## ConfirmDialogComponent

PrimeNG confirmation dialog wrapper. Use `ConfirmService` to trigger confirmations programmatically.

### Setup

1. Add `<lib-confirm-dialog></lib-confirm-dialog>` to your app component:

```typescript
@Component({
  selector: 'app-root',
  imports: [ConfirmDialogComponent],
  template: `
    <router-outlet></router-outlet>
    <lib-confirm-dialog></lib-confirm-dialog>
  `
})
export class AppComponent {}
```

### Usage

```typescript
import { ConfirmService } from '@workly/ui-component';
import { inject } from '@angular/core';

@Component({
  template: `
    <button (click)="showDeleteConfirm()">Delete Item</button>
  `
})
export class MyComponent {
  private confirmService = inject(ConfirmService);

  showDeleteConfirm() {
    this.confirmService.confirmDelete({
      message: 'Are you sure you want to delete this item?',
      accept: () => {
        // Handle delete
        console.log('Item deleted');
      },
      reject: () => {
        console.log('Delete cancelled');
      }
    });
  }
}
```

### Available Methods

- `confirm(config: ConfirmConfig)` - Show custom confirmation
- `confirmDelete(config?)` - Show delete confirmation
- `confirmSave(config?)` - Show save confirmation
- `confirmWarning(config?)` - Show warning confirmation
- `close()` - Close confirmation dialog

### Example: Delete Confirmation

```typescript
this.confirmService.confirmDelete({
  message: 'Are you sure you want to delete this item? This action cannot be undone.',
  accept: () => {
    this.deleteItem();
  }
});
```

### Example: Save Confirmation

```typescript
this.confirmService.confirmSave({
  message: 'Are you sure you want to save these changes?',
  accept: () => {
    this.saveChanges();
  }
});
```

### Example: Custom Confirmation

```typescript
this.confirmService.confirm({
  header: 'Custom Confirmation',
  message: 'Are you sure you want to proceed?',
  icon: 'pi pi-question-circle',
  acceptLabel: 'Yes',
  rejectLabel: 'No',
  accept: () => {
    // Handle accept
  },
  reject: () => {
    // Handle reject
  }
});
```

## DialogService

Service for opening dynamic dialogs with custom components programmatically.

### Usage

```typescript
import { LibDialogService } from '@workly/ui-component';
import { inject } from '@angular/core';

@Component({
  template: `
    <button (click)="openUserDialog()">Open User Dialog</button>
  `
})
export class MyComponent {
  private dialogService = inject(LibDialogService);

  openUserDialog() {
    const ref = this.dialogService.open(UserDialogComponent, {
      header: 'User Details',
      width: '600px',
      data: { userId: 123 }
    });

    ref.onClose.subscribe((result) => {
      console.log('Dialog closed with result:', result);
    });
  }
}
```

### Available Methods

- `open<T>(component: Type<T>, options?: DialogOptions)` - Open dialog
- `openSmall<T>(component: Type<T>, options?)` - Open small dialog (400px)
- `openMedium<T>(component: Type<T>, options?)` - Open medium dialog (600px)
- `openLarge<T>(component: Type<T>, options?)` - Open large dialog (900px)
- `closeAll()` - Close all open dialogs

### Example: Dynamic Dialog with Component

```typescript
// UserDialogComponent
@Component({
  template: `
    <div>
      <p>User ID: {{ userId }}</p>
      <button (click)="close()">Close</button>
    </div>
  `
})
export class UserDialogComponent {
  userId: number;
  
  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig) {
    this.userId = config.data.userId;
  }

  close() {
    this.ref.close({ saved: true });
  }
}

// Using the dialog
const ref = this.dialogService.openMedium(UserDialogComponent, {
  header: 'User Details',
  data: { userId: 123 }
});

ref.onClose.subscribe((result) => {
  if (result?.saved) {
    // Handle save
  }
});
```

## Size Variants

All dialog components support size variants:

- `small` - 400px width (90vw on mobile)
- `medium` - 600px width (default, 90vw on mobile)
- `large` - 900px width (90vw on mobile)
- `fullscreen` - 100vw x 100vh

## Styling

All dialogs use standardized design tokens:

- **Padding**: 16px (var(--spacing-4))
- **Border Radius**: 8px (var(--border-radius-lg))
- **Typography**: Title 20px (semibold), Subtitle 14px (normal)
- **Button Gap**: 12px (var(--spacing-3))

Dark theme is automatically supported via `.p-dark` class.

## Best Practices

1. **ConfirmDialogComponent**: Add once to your app root component
2. **DialogComponent**: Use for configurable dialogs with forms or custom content
3. **DialogService**: Use for programmatic dialogs with custom components
4. **Form Dialogs**: Use `DialogComponent` with `content.type: 'form'` for forms
5. **Simple Confirmations**: Use `ConfirmService` for quick confirmations

## Examples

See Storybook stories for comprehensive examples:
- `shared/ui-component/src/lib/design-system/dialog/dialog.component.stories.ts`
- `shared/ui-component/src/lib/design-system/dialog/confirm-dialog.stories.ts`


import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {
  // Inputs
  title = input<string>();
  subtitle = input<string>();
  formGroup = input<FormGroup | null>(null);
  layout = input<'vertical' | 'horizontal' | 'inline'>('vertical');
  spacing = input<'none' | 'compact' | 'comfortable'>('comfortable');
  showLabels = input<boolean>(true);
  showValidation = input<boolean>(true);

  // Outputs
  submit = output<FormGroup>();
  reset = output<void>();

  onSubmit(event: Event): void {
    event.preventDefault();
    const form = this.formGroup();
    if (form && form.valid) {
      this.submit.emit(form);
    }
  }

  onReset(): void {
    const form = this.formGroup();
    if (form) {
      form.reset();
      this.reset.emit();
    }
  }

  get formClass(): string {
    const classes = ['lib-form'];
    classes.push(`lib-form-${this.layout()}`);
    classes.push(`lib-form-spacing-${this.spacing()}`);
    if (!this.showLabels()) classes.push('lib-form-no-labels');
    return classes.join(' ');
  }
}


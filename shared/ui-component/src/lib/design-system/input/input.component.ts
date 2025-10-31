import { Component, input, output, forwardRef, ChangeDetectionStrategy, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

export type InputSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'lib-input',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements ControlValueAccessor {
  // Inputs
  type = input<string>('text');
  placeholder = input<string>('');
  value = input<string>('');
  size = input<InputSize>('medium');
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  required = input<boolean>(false);
  invalid = input<boolean>(false);
  label = input<string>();
  hint = input<string>();
  errorMessage = input<string>();
  showClear = input<boolean>(false);
  iconLeft = input<string>();
  iconRight = input<string>();
  formControl = input<any>(null);

  // Outputs
  valueChange = output<string>();
  clear = output<void>();
  focusEvent = output<Event>();
  blurEvent = output<Event>();

  // ControlValueAccessor implementation
  private internalValue = '';
  private onChange = (value: string) => {};
  private onTouched = () => {};

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.internalValue = target.value;
    this.onChange(this.internalValue);
    this.valueChange.emit(this.internalValue);
  }

  onFocus(event: Event): void {
    this.focusEvent.emit(event);
  }

  onBlur(event: Event): void {
    this.onTouched();
    this.blurEvent.emit(event);
  }

  onClear(): void {
    this.internalValue = '';
    this.onChange('');
    this.valueChange.emit('');
    this.clear.emit();
  }

  writeValue(value: string): void {
    if (value !== undefined && value !== null) {
      this.internalValue = value;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Handled by input property
  }

  get inputValue(): string {
    const control = this.formControl();
    if (control && control.value !== undefined && control.value !== null) {
      return String(control.value);
    }
    return this.value() !== undefined ? this.value() : this.internalValue;
  }

  get $any(): any {
    return (value: any) => value;
  }
}


import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'lib-toast',
  imports: [CommonModule, ToastModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]
})
export class ToastComponent {
  // This component provides the PrimeNG toast structure
  // Use ToastService to trigger toasts programmatically
}


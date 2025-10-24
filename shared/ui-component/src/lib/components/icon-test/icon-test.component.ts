import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-icon-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="icon-test-container">
      <h3>PrimeIcons Test</h3>
      <div class="icon-grid">
        <div class="icon-item">
          <i class="pi pi-search"></i>
          <span>Search</span>
        </div>
        <div class="icon-item">
          <i class="pi pi-palette"></i>
          <span>Palette</span>
        </div>
        <div class="icon-item">
          <i class="pi pi-bell"></i>
          <span>Bell</span>
        </div>
        <div class="icon-item">
          <i class="pi pi-user"></i>
          <span>User</span>
        </div>
        <div class="icon-item">
          <i class="pi pi-home"></i>
          <span>Home</span>
        </div>
        <div class="icon-item">
          <i class="pi pi-cog"></i>
          <span>Settings</span>
        </div>
        <div class="icon-item">
          <i class="pi pi-sign-out"></i>
          <span>Logout</span>
        </div>
        <div class="icon-item">
          <i class="pi pi-check"></i>
          <span>Check</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .icon-test-container {
      padding: 2rem;
      background: var(--surface-0);
      border-radius: 8px;
      margin: 1rem 0;
    }

    .icon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .icon-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem;
      background: var(--surface-50);
      border-radius: 6px;
      transition: all 0.2s ease;
    }

    .icon-item:hover {
      background: var(--primary-50);
      transform: translateY(-2px);
    }

    .icon-item i {
      font-size: 1.5rem;
      color: var(--primary-600);
    }

    .icon-item span {
      font-size: 0.875rem;
      color: var(--primary-700);
      font-weight: 500;
    }

    h3 {
      color: var(--primary-800);
      margin: 0 0 1rem 0;
    }
  `]
})
export class IconTestComponent {}

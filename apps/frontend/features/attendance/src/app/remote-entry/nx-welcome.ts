import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nx-welcome',
  imports: [CommonModule],
  template: `
    <div class="welcome-container">
      <h1>Attendance Management</h1>
      <p>Welcome to the attendance management system!</p>
      <div class="features">
        <h2>Features:</h2>
        <ul>
          <li>Check-in/Check-out</li>
          <li>Attendance Reports</li>
          <li>Regularization Requests</li>
          <li>Time Tracking</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .welcome-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }
    
    h1 {
      color: #2563eb;
      margin-bottom: 1rem;
    }
    
    .features {
        margin-top: 2rem;
        text-align: left;
    }
    
    .features ul {
      list-style-type: disc;
      padding-left: 2rem;
    }
    
    .features li {
      margin-bottom: 0.5rem;
    }
  `]
})
export class NxWelcome {}
import { Component, signal, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

export interface AttendanceReport {
  id: string;
  reportName: string;
  description: string;
  generatedAt: Date;
  generatedBy: string;
  status: 'completed' | 'processing' | 'failed';
  downloadUrl?: string;
}

@Component({
  selector: 'app-attendance-reports',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    TableModule,
    BadgeModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './attendance-reports.component.html',
  styleUrls: ['./attendance-reports.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttendanceReportsComponent implements OnInit {
  private messageService = inject(MessageService);

  // Data signals
  reports = signal<AttendanceReport[]>([]);
  loading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.loading.set(true);

    setTimeout(() => {
      const reports: AttendanceReport[] = [
        {
          id: '1',
          reportName: 'Monthly Attendance Summary',
          description: 'Complete attendance summary for the current month',
          generatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          generatedBy: 'John Doe',
          status: 'completed',
          downloadUrl: '/reports/monthly-summary.pdf'
        },
        {
          id: '2',
          reportName: 'Late Arrivals Report',
          description: 'Report of all late arrivals for the past week',
          generatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
          generatedBy: 'Jane Smith',
          status: 'completed',
          downloadUrl: '/reports/late-arrivals.pdf'
        },
        {
          id: '3',
          reportName: 'Department Attendance Analysis',
          description: 'Attendance analysis by department',
          generatedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          generatedBy: 'Mike Johnson',
          status: 'processing'
        },
        {
          id: '4',
          reportName: 'Overtime Report',
          description: 'Overtime hours report for the current month',
          generatedAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
          generatedBy: 'Sarah Wilson',
          status: 'failed'
        }
      ];

      this.reports.set(reports);
      this.loading.set(false);
    }, 1500);
  }

  handleGenerateReport(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Report Generation',
      detail: 'New report generation has been initiated'
    });
  }

  handleDownloadReport(report: AttendanceReport): void {
    if (report.downloadUrl) {
      this.messageService.add({
        severity: 'success',
        summary: 'Download Started',
        detail: `Downloading ${report.reportName}`
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Download Unavailable',
        detail: 'Report is still processing or failed to generate'
      });
    }
  }

  handleDeleteReport(report: AttendanceReport): void {
    this.reports.update(reports => reports.filter(r => r.id !== report.id));
    this.messageService.add({
      severity: 'info',
      summary: 'Report Deleted',
      detail: `${report.reportName} has been deleted`
    });
  }

  getStatusSeverity(status: AttendanceReport['status']): 'info' | 'success' | 'warn' | 'danger' | 'secondary' | 'contrast' | null | undefined {
    switch (status) {
      case 'completed': return 'success';
      case 'processing': return 'warn';
      case 'failed': return 'danger';
      default: return 'secondary';
    }
  }

  getStatusLabel(status: AttendanceReport['status']): string {
    switch (status) {
      case 'completed': return 'Completed';
      case 'processing': return 'Processing';
      case 'failed': return 'Failed';
      default: return 'Unknown';
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

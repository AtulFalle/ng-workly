import type { Meta, StoryObj } from '@storybook/angular';
import { ChartComponent } from './chart.component';
import { ChartOptions } from 'chart.js';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig } from '@storybook/angular';
import { ChartType } from './chart.types';

const meta: Meta<ChartComponent> = {
  title: 'Design System/Chart',
  component: ChartComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideAnimations()]
    })
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['line', 'bar', 'pie', 'doughnut', 'polarArea', 'radar', 'area', 'bubble', 'scatter'],
      description: 'Chart type'
    }
  }
};

export default meta;
type Story = StoryObj<ChartComponent>;

// Helper function to create common chart options
const createCommonOptions = (title: string): ChartOptions => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 15
      }
    },
    title: {
      display: true,
      text: title,
      font: {
        size: 18,
        weight: 'bold'
      },
      padding: {
        top: 10,
        bottom: 20
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0
      }
    }
  }
});

// Employee Growth Chart (Line Chart)
export const EmployeeGrowth: Story = {
  args: {
    type: 'line' as ChartType,
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Total Employees',
          data: [150, 152, 155, 158, 162, 165, 168, 172, 175, 178, 180, 185],
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 2
        },
        {
          label: 'New Hires',
          data: [5, 2, 3, 3, 4, 3, 3, 4, 3, 3, 2, 5],
          borderColor: '#2196F3',
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 2
        }
      ]
    },
    options: createCommonOptions('Employee Growth Trend')
  }
};

// Department Distribution (Pie Chart)
export const DepartmentDistribution: Story = {
  args: {
    type: 'pie' as ChartType,
    data: {
      labels: ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations', 'Support'],
      datasets: [
        {
          data: [85, 45, 32, 18, 25, 28, 22],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#FF6384'
          ],
          borderColor: '#ffffff',
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'right' as const,
          labels: {
            usePointStyle: true,
            padding: 15
          }
        },
        title: {
          display: true,
          text: 'Department Distribution',
          font: {
            size: 18,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 20
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.parsed || 0;
              const total = context.dataset.data.reduce((a: any, b: any) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    }
  }
};

// Attendance Trends (Line Chart)
export const AttendanceTrends: Story = {
  args: {
    type: 'line' as ChartType,
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Present',
          data: [165, 168, 170, 172, 170, 45, 35],
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 2
        },
        {
          label: 'Absent',
          data: [10, 7, 5, 3, 5, 8, 12],
          borderColor: '#F44336',
          backgroundColor: 'rgba(244, 67, 54, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 2
        },
        {
          label: 'On Leave',
          data: [5, 5, 5, 5, 5, 127, 133],
          borderColor: '#FF9800',
          backgroundColor: 'rgba(255, 152, 0, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 2
        }
      ]
    },
    options: createCommonOptions('Weekly Attendance Trends')
  }
};

// Salary Distribution (Bar Chart)
export const SalaryDistribution: Story = {
  args: {
    type: 'bar' as ChartType,
    data: {
      labels: ['$0-30k', '$30-50k', '$50-70k', '$70-90k', '$90-110k', '$110k+'],
      datasets: [
        {
          label: 'Number of Employees',
          data: [25, 45, 65, 40, 15, 10],
          backgroundColor: [
            'rgba(54, 162, 235, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(54, 162, 235, 0.8)'
          ],
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      ...createCommonOptions('Salary Distribution'),
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0,
            callback: function(value) {
              return value + ' employees';
            }
          }
        },
        x: {
          ticks: {
            maxRotation: 0
          }
        }
      }
    }
  }
};

// Performance Ratings (Radar Chart)
export const PerformanceRatings: Story = {
  args: {
    type: 'radar' as ChartType,
    data: {
      labels: ['Communication', 'Technical Skills', 'Teamwork', 'Problem Solving', 'Leadership', 'Innovation', 'Quality'],
      datasets: [
        {
          label: 'Team Average',
          data: [85, 78, 90, 82, 75, 80, 88],
          borderColor: '#2196F3',
          backgroundColor: 'rgba(33, 150, 243, 0.2)',
          borderWidth: 2,
          fill: true
        },
        {
          label: 'Department Average',
          data: [80, 82, 85, 80, 78, 82, 85],
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          borderWidth: 2,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'top' as const,
          labels: {
            usePointStyle: true,
            padding: 15
          }
        },
        title: {
          display: true,
          text: 'Performance Ratings - Team vs Department',
          font: {
            size: 18,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 20
          }
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 20
          }
        }
      }
    }
  }
};

// Hiring Trends (Area Chart)
export const HiringTrends: Story = {
  args: {
    type: 'area' as ChartType,
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'New Hires',
          data: [12, 15, 18, 14],
          borderColor: '#2196F3',
          backgroundColor: 'rgba(33, 150, 243, 0.3)',
          fill: true,
          tension: 0.4,
          borderWidth: 2
        },
        {
          label: 'Resignations',
          data: [5, 8, 6, 7],
          borderColor: '#F44336',
          backgroundColor: 'rgba(244, 67, 54, 0.3)',
          fill: true,
          tension: 0.4,
          borderWidth: 2
        },
        {
          label: 'Net Growth',
          data: [7, 7, 12, 7],
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.3)',
          fill: true,
          tension: 0.4,
          borderWidth: 2
        }
      ]
    },
    options: createCommonOptions('Quarterly Hiring Trends')
  }
};

// Gender Distribution (Doughnut Chart)
export const GenderDistribution: Story = {
  args: {
    type: 'doughnut' as ChartType,
    data: {
      labels: ['Male', 'Female', 'Other'],
      datasets: [
        {
          data: [125, 105, 5],
          backgroundColor: [
            '#2196F3',
            '#E91E63',
            '#9E9E9E'
          ],
          borderColor: '#ffffff',
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'right' as const,
          labels: {
            usePointStyle: true,
            padding: 15
          }
        },
        title: {
          display: true,
          text: 'Gender Distribution',
          font: {
            size: 18,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 20
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.parsed || 0;
              const total = context.dataset.data.reduce((a: any, b: any) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    }
  }
};

// Monthly Payroll (Bar Chart)
export const MonthlyPayroll: Story = {
  args: {
    type: 'bar' as ChartType,
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Base Salary',
          data: [450000, 455000, 460000, 465000, 470000, 475000, 480000, 485000, 490000, 495000, 500000, 505000],
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Bonuses',
          data: [50000, 45000, 55000, 60000, 55000, 65000, 70000, 75000, 70000, 80000, 85000, 90000],
          backgroundColor: 'rgba(75, 192, 192, 0.8)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      ...createCommonOptions('Monthly Payroll Breakdown'),
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '$' + (value as number / 1000) + 'k';
            }
          }
        }
      }
    }
  }
};

// Leave Requests (Bar Chart)
export const LeaveRequests: Story = {
  args: {
    type: 'bar' as ChartType,
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Approved',
          data: [45, 52, 48, 55, 60, 65, 70, 68, 62, 58, 55, 50],
          backgroundColor: 'rgba(76, 175, 80, 0.8)',
          borderColor: 'rgba(76, 175, 80, 1)',
          borderWidth: 1
        },
        {
          label: 'Pending',
          data: [8, 12, 10, 15, 18, 20, 22, 20, 18, 15, 12, 10],
          backgroundColor: 'rgba(255, 152, 0, 0.8)',
          borderColor: 'rgba(255, 152, 0, 1)',
          borderWidth: 1
        },
        {
          label: 'Rejected',
          data: [2, 3, 2, 4, 3, 5, 4, 5, 3, 4, 3, 2],
          backgroundColor: 'rgba(244, 67, 54, 0.8)',
          borderColor: 'rgba(244, 67, 54, 1)',
          borderWidth: 1
        }
      ]
    },
    options: createCommonOptions('Monthly Leave Requests')
  }
};

// Training Completion (Line Chart)
export const TrainingCompletion: Story = {
  args: {
    type: 'line' as ChartType,
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Completed Trainings',
          data: [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        },
        {
          label: 'In Progress',
          data: [15, 18, 20, 22, 25, 28, 30, 32, 30, 28, 25, 22],
          borderColor: '#FF9800',
          backgroundColor: 'rgba(255, 152, 0, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        }
      ]
    },
    options: createCommonOptions('Training Completion Progress')
  }
};

// Employee Satisfaction (Polar Area Chart)
export const EmployeeSatisfaction: Story = {
  args: {
    type: 'polarArea' as ChartType,
    data: {
      labels: ['Work-Life Balance', 'Compensation', 'Career Growth', 'Company Culture', 'Management', 'Benefits'],
      datasets: [
        {
          data: [4.2, 4.0, 3.8, 4.5, 4.1, 4.3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)'
          ],
          borderColor: '#ffffff',
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'right' as const,
          labels: {
            usePointStyle: true,
            padding: 15
          }
        },
        title: {
          display: true,
          text: 'Employee Satisfaction Ratings (Out of 5)',
          font: {
            size: 18,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 20
          }
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 5,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  }
};

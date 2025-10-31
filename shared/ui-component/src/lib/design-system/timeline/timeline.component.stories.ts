import type { Meta, StoryObj } from '@storybook/angular';
import { TimelineComponent } from './timeline.component';
import { TimelineItem, TimelineAlignment, TimelineSize, TimelineVariant } from './timeline.types';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig } from '@storybook/angular';

const meta: Meta<TimelineComponent> = {
  title: 'Design System/Timeline',
  component: TimelineComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideAnimations()]
    })
  ],
  argTypes: {
    alignment: {
      control: 'select',
      options: ['left', 'right', 'alternate'],
      description: 'Timeline alignment'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Timeline size'
    },
    variant: {
      control: 'select',
      options: ['default', 'employee', 'leave', 'attendance', 'performance', 'training', 'project', 'hiring', 'payroll'],
      description: 'Timeline variant'
    }
  }
};

export default meta;
type Story = StoryObj<TimelineComponent>;

// Employee Career Timeline
const employeeTimeline: TimelineItem[] = [
  {
    id: '1',
    title: 'Joined Company',
    description: 'Started as Junior Developer in Engineering Department',
    timestamp: new Date('2020-01-15'),
    status: 'completed',
    variant: 'employee',
    metadata: {
      'Department': 'Engineering',
      'Position': 'Junior Developer',
      'Salary': '$50,000'
    }
  },
  {
    id: '2',
    title: 'Promoted to Mid-Level Developer',
    description: 'Recognized for outstanding performance and technical skills',
    timestamp: new Date('2021-06-01'),
    status: 'completed',
    variant: 'employee',
    metadata: {
      'Department': 'Engineering',
      'Position': 'Mid-Level Developer',
      'Salary': '$65,000'
    }
  },
  {
    id: '3',
    title: 'Completed Leadership Training',
    description: 'Successfully completed company leadership development program',
    timestamp: new Date('2022-03-15'),
    status: 'completed',
    variant: 'training',
    metadata: {
      'Program': 'Leadership Development',
      'Duration': '3 months',
      'Status': 'Passed with Excellence'
    }
  },
  {
    id: '4',
    title: 'Promoted to Senior Developer',
    description: 'Advanced to senior role with team lead responsibilities',
    timestamp: new Date('2022-09-01'),
    status: 'completed',
    variant: 'employee',
    metadata: {
      'Department': 'Engineering',
      'Position': 'Senior Developer',
      'Salary': '$85,000',
      'Team Size': '5 members'
    }
  },
  {
    id: '5',
    title: 'Transferred to Product Team',
    description: 'Moved to Product Engineering to lead new product initiatives',
    timestamp: new Date('2023-04-01'),
    status: 'completed',
    variant: 'employee',
    metadata: {
      'Department': 'Product Engineering',
      'Position': 'Senior Developer',
      'Team': 'Product Innovation'
    }
  },
  {
    id: '6',
    title: 'Promoted to Engineering Manager',
    description: 'Assumed management role overseeing engineering team',
    timestamp: new Date('2024-01-01'),
    status: 'completed',
    variant: 'employee',
    metadata: {
      'Department': 'Product Engineering',
      'Position': 'Engineering Manager',
      'Salary': '$120,000',
      'Team Size': '12 members'
    }
  }
];

// Leave Request Timeline
const leaveTimeline: TimelineItem[] = [
  {
    id: '1',
    title: 'Leave Request Submitted',
    description: 'Requested 5 days of annual leave for vacation',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    status: 'completed',
    variant: 'leave',
    user: {
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      avatar: 'https://via.placeholder.com/32'
    },
    metadata: {
      'Type': 'Annual Leave',
      'Days': '5',
      'From': '2024-12-15',
      'To': '2024-12-19'
    },
    actions: [
      {
        label: 'View Details',
        icon: 'pi pi-eye',
        variant: 'primary',
        command: () => console.log('View leave details')
      }
    ]
  },
  {
    id: '2',
    title: 'Reviewed by Direct Manager',
    description: 'John Smith reviewed and approved the leave request',
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    status: 'approved',
    variant: 'leave',
    user: {
      name: 'John Smith',
      role: 'Engineering Manager',
      avatar: 'https://via.placeholder.com/32'
    },
    actions: [
      {
        label: 'View Approval',
        icon: 'pi pi-check',
        variant: 'success',
        command: () => console.log('View approval details')
      }
    ]
  },
  {
    id: '3',
    title: 'HR Approval Pending',
    description: 'Waiting for HR department final approval',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: 'in-progress',
    variant: 'leave',
    user: {
      name: 'HR Department',
      role: 'Human Resources'
    }
  },
  {
    id: '4',
    title: 'Leave Approved by HR',
    description: 'HR department has approved the leave request',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    status: 'approved',
    variant: 'leave',
    user: {
      name: 'Emily Davis',
      role: 'HR Manager',
      avatar: 'https://via.placeholder.com/32'
    },
    metadata: {
      'Approved By': 'Emily Davis',
      'Approval Date': new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString()
    }
  },
  {
    id: '5',
    title: 'Leave Started',
    description: 'Employee has started their approved leave',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    status: 'in-progress',
    variant: 'leave',
    metadata: {
      'Status': 'On Leave',
      'Remaining Days': '4 days'
    }
  }
];

// Attendance Timeline
const attendanceTimeline: TimelineItem[] = [
  {
    id: '1',
    title: 'Check-In',
    description: 'Employee checked in for the day',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    status: 'completed',
    variant: 'attendance',
    metadata: {
      'Time': '09:15 AM',
      'Location': 'Main Office',
      'Device': 'Mobile App'
    }
  },
  {
    id: '2',
    title: 'Late Arrival Noted',
    description: 'Employee arrived 15 minutes after scheduled time',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    status: 'warning',
    variant: 'attendance',
    metadata: {
      'Scheduled': '09:00 AM',
      'Actual': '09:15 AM',
      'Delay': '15 minutes'
    }
  },
  {
    id: '3',
    title: 'Lunch Break',
    description: 'Employee took lunch break',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    status: 'completed',
    variant: 'attendance',
    metadata: {
      'Duration': '1 hour',
      'Type': 'Lunch Break'
    }
  },
  {
    id: '4',
    title: 'Check-Out',
    description: 'Employee checked out for the day',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    status: 'completed',
    variant: 'attendance',
    metadata: {
      'Time': '06:30 PM',
      'Total Hours': '9 hours 15 minutes',
      'Overtime': '1 hour 15 minutes'
    }
  }
];

// Performance Review Timeline
const performanceTimeline: TimelineItem[] = [
  {
    id: '1',
    title: 'Review Period Started',
    description: 'Annual performance review period has begun',
    timestamp: new Date('2024-01-01'),
    status: 'completed',
    variant: 'performance',
    metadata: {
      'Period': 'Q1 2024',
      'Type': 'Annual Review'
    }
  },
  {
    id: '2',
    title: 'Self-Assessment Submitted',
    description: 'Employee completed and submitted self-assessment',
    timestamp: new Date('2024-03-15'),
    status: 'completed',
    variant: 'performance',
    user: {
      name: 'Mike Wilson',
      role: 'Senior Developer'
    },
    metadata: {
      'Score': '4.2/5.0',
      'Status': 'Submitted'
    }
  },
  {
    id: '3',
    title: 'Manager Review Completed',
    description: 'Direct manager completed performance evaluation',
    timestamp: new Date('2024-03-20'),
    status: 'completed',
    variant: 'performance',
    user: {
      name: 'Sarah Johnson',
      role: 'Engineering Manager'
    },
    metadata: {
      'Overall Score': '4.5/5.0',
      'Recommendation': 'Exceeds Expectations'
    }
  },
  {
    id: '4',
    title: 'Review Meeting Scheduled',
    description: 'Performance review meeting scheduled with employee',
    timestamp: new Date('2024-03-25'),
    status: 'pending',
    variant: 'performance',
    metadata: {
      'Date': '2024-03-30',
      'Time': '10:00 AM',
      'Duration': '1 hour'
    }
  },
  {
    id: '5',
    title: 'Performance Goals Set',
    description: 'New performance goals established for next review period',
    timestamp: new Date('2024-04-05'),
    status: 'in-progress',
    variant: 'performance',
    metadata: {
      'Goals': '5 objectives',
      'Timeline': '6 months'
    }
  }
];

// Training Timeline
const trainingTimeline: TimelineItem[] = [
  {
    id: '1',
    title: 'Training Assigned',
    description: 'React Advanced Training assigned by manager',
    timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    status: 'completed',
    variant: 'training',
    metadata: {
      'Course': 'React Advanced Patterns',
      'Duration': '40 hours',
      'Type': 'Online Course'
    }
  },
  {
    id: '2',
    title: 'Training Started',
    description: 'Employee started the training course',
    timestamp: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
    status: 'completed',
    variant: 'training',
    metadata: {
      'Progress': '0%',
      'Status': 'In Progress'
    }
  },
  {
    id: '3',
    title: 'Mid-Course Assessment',
    description: 'Completed mid-course assessment with 95% score',
    timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    status: 'completed',
    variant: 'training',
    metadata: {
      'Score': '95%',
      'Progress': '50%'
    }
  },
  {
    id: '4',
    title: 'Training Completed',
    description: 'Successfully completed the training course',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: 'completed',
    variant: 'training',
    metadata: {
      'Final Score': '98%',
      'Progress': '100%',
      'Certificate': 'Issued'
    },
    actions: [
      {
        label: 'View Certificate',
        icon: 'pi pi-download',
        variant: 'primary',
        command: () => console.log('Download certificate')
      }
    ]
  }
];

// Hiring Timeline
const hiringTimeline: TimelineItem[] = [
  {
    id: '1',
    title: 'Job Posting Created',
    description: 'Senior Software Engineer position posted',
    timestamp: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    status: 'completed',
    variant: 'hiring',
    metadata: {
      'Position': 'Senior Software Engineer',
      'Department': 'Engineering',
      'Status': 'Active'
    }
  },
  {
    id: '2',
    title: 'Application Received',
    description: 'Received 25 applications for the position',
    timestamp: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
    status: 'completed',
    variant: 'hiring',
    metadata: {
      'Applications': '25',
      'Screening': 'In Progress'
    }
  },
  {
    id: '3',
    title: 'Interview Scheduled',
    description: '5 candidates selected for technical interviews',
    timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    status: 'completed',
    variant: 'hiring',
    metadata: {
      'Candidates': '5',
      'Interview Type': 'Technical'
    }
  },
  {
    id: '4',
    title: 'Final Candidate Selected',
    description: 'Candidate selected after final round interview',
    timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    status: 'completed',
    variant: 'hiring',
    user: {
      name: 'Alex Thompson',
      role: 'Candidate'
    },
    metadata: {
      'Candidate': 'Alex Thompson',
      'Experience': '8 years',
      'Status': 'Selected'
    }
  },
  {
    id: '5',
    title: 'Offer Extended',
    description: 'Job offer extended to selected candidate',
    timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    status: 'pending',
    variant: 'hiring',
    metadata: {
      'Offer Amount': '$120,000',
      'Status': 'Pending Acceptance'
    }
  },
  {
    id: '6',
    title: 'Offer Accepted',
    description: 'Candidate accepted the job offer',
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    status: 'approved',
    variant: 'hiring',
    metadata: {
      'Start Date': '2024-01-15',
      'Status': 'Onboarding Scheduled'
    }
  }
];

// Project Timeline
const projectTimeline: TimelineItem[] = [
  {
    id: '1',
    title: 'Project Initiated',
    description: 'New HR Management System project started',
    timestamp: new Date('2024-01-01'),
    status: 'completed',
    variant: 'project',
    metadata: {
      'Project': 'HR Management System',
      'Team Size': '8 members',
      'Timeline': '6 months'
    }
  },
  {
    id: '2',
    title: 'Requirements Gathering',
    description: 'Completed requirements gathering phase',
    timestamp: new Date('2024-01-15'),
    status: 'completed',
    variant: 'project',
    metadata: {
      'Phase': 'Planning',
      'Duration': '2 weeks',
      'Status': 'Complete'
    }
  },
  {
    id: '3',
    title: 'Design Phase Started',
    description: 'UI/UX design and architecture planning',
    timestamp: new Date('2024-02-01'),
    status: 'in-progress',
    variant: 'project',
    metadata: {
      'Phase': 'Design',
      'Progress': '60%',
      'Deadline': '2024-02-28'
    }
  },
  {
    id: '4',
    title: 'Development Phase',
    description: 'Core development work in progress',
    timestamp: new Date('2024-03-01'),
    status: 'in-progress',
    variant: 'project',
    metadata: {
      'Phase': 'Development',
      'Progress': '40%',
      'Sprints': '8 completed'
    }
  }
];

// Default story
export const Default: Story = {
  args: {
    items: employeeTimeline,
    alignment: 'left',
    size: 'medium',
    variant: 'default',
    showIcons: true,
    showDates: true,
    showAvatars: false,
    showActions: true
  }
};

// Employee Career Timeline
export const EmployeeCareer: Story = {
  args: {
    items: employeeTimeline,
    alignment: 'alternate',
    size: 'medium',
    variant: 'employee',
    showIcons: true,
    showDates: true,
    showAvatars: false,
    showActions: false
  }
};

// Leave Request Timeline
export const LeaveRequest: Story = {
  args: {
    items: leaveTimeline,
    alignment: 'left',
    size: 'medium',
    variant: 'leave',
    showIcons: true,
    showDates: true,
    showAvatars: true,
    showActions: true
  }
};

// Attendance Timeline
export const Attendance: Story = {
  args: {
    items: attendanceTimeline,
    alignment: 'left',
    size: 'small',
    variant: 'attendance',
    showIcons: true,
    showDates: true,
    showAvatars: false,
    showActions: false
  }
};

// Performance Review Timeline
export const PerformanceReview: Story = {
  args: {
    items: performanceTimeline,
    alignment: 'alternate',
    size: 'medium',
    variant: 'performance',
    showIcons: true,
    showDates: true,
    showAvatars: true,
    showActions: false
  }
};

// Training Timeline
export const Training: Story = {
  args: {
    items: trainingTimeline,
    alignment: 'left',
    size: 'medium',
    variant: 'training',
    showIcons: true,
    showDates: true,
    showAvatars: false,
    showActions: true
  }
};

// Hiring Timeline
export const Hiring: Story = {
  args: {
    items: hiringTimeline,
    alignment: 'alternate',
    size: 'medium',
    variant: 'hiring',
    showIcons: true,
    showDates: true,
    showAvatars: true,
    showActions: false
  }
};

// Project Timeline
export const Project: Story = {
  args: {
    items: projectTimeline,
    alignment: 'alternate',
    size: 'medium',
    variant: 'project',
    showIcons: true,
    showDates: true,
    showAvatars: false,
    showActions: false
  }
};

// Right Alignment
export const RightAlignment: Story = {
  args: {
    items: leaveTimeline,
    alignment: 'right',
    size: 'medium',
    variant: 'leave',
    showIcons: true,
    showDates: true,
    showAvatars: true,
    showActions: true
  }
};

// Small Size
export const SmallSize: Story = {
  args: {
    items: attendanceTimeline,
    alignment: 'left',
    size: 'small',
    variant: 'attendance',
    showIcons: true,
    showDates: true,
    showAvatars: false,
    showActions: false
  }
};

// Large Size
export const LargeSize: Story = {
  args: {
    items: employeeTimeline.slice(0, 3),
    alignment: 'left',
    size: 'large',
    variant: 'employee',
    showIcons: true,
    showDates: true,
    showAvatars: false,
    showActions: false
  }
};

import { Injectable } from '@angular/core';
import { AttendanceRecord } from '../components/attendance-dashboard/attendance-dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class AttendanceDataService {

  getMockAttendanceData(): AttendanceRecord[] {
    return [
      {
        id: '1',
        employeeId: 'EMP001',
        employeeName: 'John Doe',
        date: new Date(),
        checkIn: new Date(Date.now() - 8 * 60 * 60 * 1000),
        checkOut: null,
        totalHours: 8,
        status: 'present',
        location: 'Office',
        device: 'Mobile App'
      },
      {
        id: '2',
        employeeId: 'EMP002',
        employeeName: 'Jane Smith',
        date: new Date(),
        checkIn: new Date(Date.now() - 7.5 * 60 * 60 * 1000),
        checkOut: new Date(Date.now() - 0.5 * 60 * 60 * 1000),
        totalHours: 7,
        status: 'present',
        location: 'Office',
        device: 'Desktop'
      },
      {
        id: '3',
        employeeId: 'EMP003',
        employeeName: 'Mike Johnson',
        date: new Date(),
        checkIn: null,
        checkOut: null,
        totalHours: 0,
        status: 'absent',
        notes: 'Sick leave'
      }
    ];
  }

  getMockCurrentUserAttendance(): AttendanceRecord {
    return {
      id: 'current',
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      date: new Date(),
      checkIn: new Date(Date.now() - 8 * 60 * 60 * 1000),
      checkOut: null,
      totalHours: 8,
      status: 'present',
      location: 'Office',
      device: 'Mobile App'
    };
  }
}

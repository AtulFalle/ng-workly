import { Injectable } from '@angular/core';
import { AttendanceRecord } from '../components/attendance-list/attendance-list.component';

@Injectable({
  providedIn: 'root'
})
export class AttendanceListDataService {

  getMockAttendanceRecords(): AttendanceRecord[] {
    return [
      this.createMockRecord({ id: '1', empId: 'EMP001', name: 'John Doe', dept: 'Engineering', status: 'present' }),
      this.createMockRecord({ id: '2', empId: 'EMP002', name: 'Jane Smith', dept: 'Marketing', status: 'present' }),
      this.createMockRecord({ id: '3', empId: 'EMP003', name: 'Mike Johnson', dept: 'Sales', status: 'absent' }),
      this.createMockRecord({ id: '4', empId: 'EMP004', name: 'Sarah Wilson', dept: 'HR', status: 'late' }),
      this.createMockRecord({ id: '5', empId: 'EMP005', name: 'David Brown', dept: 'Finance', status: 'half-day' })
    ];
  }

  private createMockRecord(recordData: { id: string; empId: string; name: string; dept: string; status: string }): AttendanceRecord {
    const baseRecord = this.createBaseRecord(recordData);
    return this.applyStatusSpecificData(baseRecord, recordData.status);
  }

  private createBaseRecord(recordData: { id: string; empId: string; name: string; dept: string; status: string }): AttendanceRecord {
    return {
      id: recordData.id,
      employeeId: recordData.empId,
      employeeName: recordData.name,
      department: recordData.dept,
      date: new Date(),
      checkIn: null,
      checkOut: null,
      totalHours: 0,
      status: recordData.status as 'present' | 'absent' | 'late' | 'half-day' | 'regularization-pending',
      location: 'Office',
      device: 'Mobile App'
    };
  }

  private applyStatusSpecificData(baseRecord: AttendanceRecord, status: string): AttendanceRecord {
    switch (status) {
      case 'present':
        return this.createPresentRecord(baseRecord);
      case 'absent':
        return this.createAbsentRecord(baseRecord);
      case 'late':
        return this.createLateRecord(baseRecord);
      case 'half-day':
        return this.createHalfDayRecord(baseRecord);
      default:
        return baseRecord;
    }
  }

  private createPresentRecord(baseRecord: AttendanceRecord): AttendanceRecord {
    return {
      ...baseRecord,
      checkIn: new Date(Date.now() - 8 * 60 * 60 * 1000),
      totalHours: 8
    };
  }

  private createAbsentRecord(baseRecord: AttendanceRecord): AttendanceRecord {
    return {
      ...baseRecord,
      notes: 'Sick leave'
    };
  }

  private createLateRecord(baseRecord: AttendanceRecord): AttendanceRecord {
    return {
      ...baseRecord,
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      checkIn: new Date(Date.now() - 24 * 60 * 60 * 1000 - 7 * 60 * 60 * 1000),
      checkOut: new Date(Date.now() - 24 * 60 * 60 * 1000 - 1 * 60 * 60 * 1000),
      totalHours: 6
    };
  }

  private createHalfDayRecord(baseRecord: AttendanceRecord): AttendanceRecord {
    return {
      ...baseRecord,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      checkIn: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 - 8 * 60 * 60 * 1000),
      checkOut: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 - 4 * 60 * 60 * 1000),
      totalHours: 4,
      notes: 'Personal appointment',
      device: 'Desktop',
      regularizationRequest: {
        id: 'REG001',
        reason: 'Medical appointment',
        status: 'pending',
        requestedBy: 'David Brown',
        requestedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      }
    };
  }
}

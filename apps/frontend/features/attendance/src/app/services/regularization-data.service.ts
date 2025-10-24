import { Injectable } from '@angular/core';
import { RegularizationRequest } from '../components/regularization/regularization.component';

@Injectable({
  providedIn: 'root'
})
export class RegularizationDataService {

  getMockRegularizationRequests(): RegularizationRequest[] {
    return [
      this.createMockRequest({ id: 'REG001', empId: 'EMP001', name: 'John Doe', dept: 'Engineering', status: 'pending' }),
      this.createMockRequest({ id: 'REG002', empId: 'EMP002', name: 'Jane Smith', dept: 'Marketing', status: 'approved' }),
      this.createMockRequest({ id: 'REG003', empId: 'EMP003', name: 'Mike Johnson', dept: 'Sales', status: 'rejected' })
    ];
  }

  private createMockRequest(requestData: { id: string; empId: string; name: string; dept: string; status: string }): RegularizationRequest {
    const baseRequest = {
      id: requestData.id,
      employeeId: requestData.empId,
      employeeName: requestData.name,
      department: requestData.dept,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      originalCheckIn: null as Date | null,
      originalCheckOut: null as Date | null,
      requestedCheckIn: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 - 8 * 60 * 60 * 1000),
      requestedCheckOut: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 - 1 * 60 * 60 * 1000),
      reason: 'Medical appointment - had to visit doctor',
      status: requestData.status as 'pending' | 'approved' | 'rejected',
      requestedBy: requestData.name,
      requestedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    };

    switch (requestData.status) {
      case 'approved':
        return {
          ...baseRequest,
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          originalCheckIn: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 - 7 * 60 * 60 * 1000),
          originalCheckOut: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 - 1 * 60 * 60 * 1000),
          requestedCheckIn: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 - 8 * 60 * 60 * 1000),
          requestedCheckOut: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 - 2 * 60 * 60 * 1000),
          reason: 'Traffic jam caused delay in arrival',
          reviewedBy: 'HR Manager',
          reviewedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          comments: 'Approved - valid reason provided'
        };
      case 'rejected':
        return {
          ...baseRequest,
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          originalCheckIn: null,
          originalCheckOut: null,
          requestedCheckIn: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 - 9 * 60 * 60 * 1000),
          requestedCheckOut: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 - 3 * 60 * 60 * 1000),
          reason: 'Personal emergency - family member hospitalized',
          reviewedBy: 'HR Manager',
          reviewedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
          comments: 'Rejected - insufficient documentation provided'
        };
      default:
        return baseRequest;
    }
  }
}

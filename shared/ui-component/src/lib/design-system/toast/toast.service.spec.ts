import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { MessageService } from 'primeng/api';

describe('ToastService', () => {
  let service: ToastService;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService, MessageService]
    });
    service = TestBed.inject(ToastService);
    messageService = TestBed.inject(MessageService);
  });

  describe('Service Initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have MessageService injected', () => {
      expect(messageService).toBeTruthy();
    });
  });

  describe('show method', () => {
    it('should call messageService.add with default values', () => {
      jest.spyOn(messageService, 'add');
      
      service.show({});
      
      expect(messageService.add).toHaveBeenCalledWith({
        severity: 'info',
        summary: '',
        detail: '',
        life: 3000,
        closable: true,
        sticky: false
      });
    });

    it('should call messageService.add with provided config', () => {
      jest.spyOn(messageService, 'add');
      
      service.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Operation completed',
        life: 5000,
        closable: false,
        sticky: true
      });
      
      expect(messageService.add).toHaveBeenCalledWith({
        severity: 'success',
        summary: 'Success',
        detail: 'Operation completed',
        life: 5000,
        closable: false,
        sticky: true
      });
    });

    it('should use default severity when not provided', () => {
      jest.spyOn(messageService, 'add');
      
      service.show({
        summary: 'Test'
      });
      
      expect(messageService.add).toHaveBeenCalledWith(
        expect.objectContaining({
          severity: 'info'
        })
      );
    });

    it('should use default life when not provided', () => {
      jest.spyOn(messageService, 'add');
      
      service.show({
        summary: 'Test'
      });
      
      expect(messageService.add).toHaveBeenCalledWith(
        expect.objectContaining({
          life: 3000
        })
      );
    });

    it('should use default closable when not provided', () => {
      jest.spyOn(messageService, 'add');
      
      service.show({
        summary: 'Test'
      });
      
      expect(messageService.add).toHaveBeenCalledWith(
        expect.objectContaining({
          closable: true
        })
      );
    });

    it('should use default sticky when not provided', () => {
      jest.spyOn(messageService, 'add');
      
      service.show({
        summary: 'Test'
      });
      
      expect(messageService.add).toHaveBeenCalledWith(
        expect.objectContaining({
          sticky: false
        })
      );
    });
  });

  describe('success method', () => {
    it('should show success toast with summary', () => {
      jest.spyOn(service, 'show');
      
      service.success('Success message');
      
      expect(service.show).toHaveBeenCalledWith({
        severity: 'success',
        summary: 'Success message',
        detail: undefined
      });
    });

    it('should show success toast with summary and detail', () => {
      jest.spyOn(service, 'show');
      
      service.success('Success message', 'Operation completed successfully');
      
      expect(service.show).toHaveBeenCalledWith({
        severity: 'success',
        summary: 'Success message',
        detail: 'Operation completed successfully'
      });
    });

    it('should show success toast with additional config', () => {
      jest.spyOn(service, 'show');
      
      service.success('Success', 'Detail', { life: 5000, sticky: true });
      
      expect(service.show).toHaveBeenCalledWith({
        severity: 'success',
        summary: 'Success',
        detail: 'Detail',
        life: 5000,
        sticky: true
      });
    });
  });

  describe('info method', () => {
    it('should show info toast with summary', () => {
      jest.spyOn(service, 'show');
      
      service.info('Info message');
      
      expect(service.show).toHaveBeenCalledWith({
        severity: 'info',
        summary: 'Info message',
        detail: undefined
      });
    });

    it('should show info toast with summary and detail', () => {
      jest.spyOn(service, 'show');
      
      service.info('Info message', 'Additional information');
      
      expect(service.show).toHaveBeenCalledWith({
        severity: 'info',
        summary: 'Info message',
        detail: 'Additional information'
      });
    });

    it('should show info toast with additional config', () => {
      jest.spyOn(service, 'show');
      
      service.info('Info', 'Detail', { life: 2000 });
      
      expect(service.show).toHaveBeenCalledWith({
        severity: 'info',
        summary: 'Info',
        detail: 'Detail',
        life: 2000
      });
    });
  });

  describe('warn method', () => {
    it('should show warning toast with summary', () => {
      jest.spyOn(service, 'show');
      
      service.warn('Warning message');
      
      expect(service.show).toHaveBeenCalledWith({
        severity: 'warn',
        summary: 'Warning message',
        detail: undefined
      });
    });

    it('should show warning toast with summary and detail', () => {
      jest.spyOn(service, 'show');
      
      service.warn('Warning message', 'Please review this action');
      
      expect(service.show).toHaveBeenCalledWith({
        severity: 'warn',
        summary: 'Warning message',
        detail: 'Please review this action'
      });
    });

    it('should show warning toast with additional config', () => {
      jest.spyOn(service, 'show');
      
      service.warn('Warning', 'Detail', { sticky: true });
      
      expect(service.show).toHaveBeenCalledWith({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Detail',
        sticky: true
      });
    });
  });

  describe('error method', () => {
    it('should show error toast with summary', () => {
      jest.spyOn(service, 'show');
      
      service.error('Error message');
      
      expect(service.show).toHaveBeenCalledWith({
        severity: 'error',
        summary: 'Error message',
        detail: undefined
      });
    });

    it('should show error toast with summary and detail', () => {
      jest.spyOn(service, 'show');
      
      service.error('Error message', 'Something went wrong');
      
      expect(service.show).toHaveBeenCalledWith({
        severity: 'error',
        summary: 'Error message',
        detail: 'Something went wrong'
      });
    });

    it('should show error toast with additional config', () => {
      jest.spyOn(service, 'show');
      
      service.error('Error', 'Detail', { life: 10000, closable: true });
      
      expect(service.show).toHaveBeenCalledWith({
        severity: 'error',
        summary: 'Error',
        detail: 'Detail',
        life: 10000,
        closable: true
      });
    });
  });

  describe('clear method', () => {
    it('should call messageService.clear', () => {
      jest.spyOn(messageService, 'clear');
      
      service.clear();
      
      expect(messageService.clear).toHaveBeenCalled();
    });
  });

  describe('All Severity Types', () => {
    it('should support all severity types', () => {
      jest.spyOn(service, 'show');
      
      const severities: Array<'success' | 'info' | 'warn' | 'error'> = ['success', 'info', 'warn', 'error'];
      
      severities.forEach(severity => {
        service.show({ severity, summary: 'Test' });
      });
      
      expect(service.show).toHaveBeenCalledTimes(4);
    });
  });
});

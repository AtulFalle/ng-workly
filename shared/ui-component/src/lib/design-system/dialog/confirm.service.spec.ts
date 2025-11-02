import { TestBed } from '@angular/core/testing';
import { ConfirmationService } from 'primeng/api';
import { ConfirmService } from './confirm.service';
import { ConfirmConfig } from './confirm.service';

describe('ConfirmService', () => {
  let service: ConfirmService;
  let confirmationService: ConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmService, ConfirmationService]
    });
    service = TestBed.inject(ConfirmService);
    confirmationService = TestBed.inject(ConfirmationService);
  });

  describe('Service Initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have ConfirmationService injected', () => {
      expect(confirmationService).toBeTruthy();
    });
  });

  describe('confirm method', () => {
    it('should call confirmationService.confirm with default values', () => {
      jest.spyOn(confirmationService, 'confirm');
      
      service.confirm({});
      
      expect(confirmationService.confirm).toHaveBeenCalledWith({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Yes',
        rejectLabel: 'No',
        acceptIcon: undefined,
        rejectIcon: undefined,
        acceptButtonStyleClass: 'p-button-primary',
        rejectButtonStyleClass: 'p-button-secondary',
        defaultFocus: 'accept',
        accept: undefined,
        reject: undefined
      });
    });

    it('should call confirmationService.confirm with custom config', () => {
      jest.spyOn(confirmationService, 'confirm');
      
      const config: ConfirmConfig = {
        message: 'Custom message',
        header: 'Custom Header',
        icon: 'pi pi-question',
        acceptLabel: 'OK',
        rejectLabel: 'Cancel',
        acceptIcon: 'pi pi-check',
        rejectIcon: 'pi pi-times',
        acceptButtonStyleClass: 'custom-accept',
        rejectButtonStyleClass: 'custom-reject',
        defaultFocus: 'reject',
        accept: jest.fn(),
        reject: jest.fn()
      };
      
      service.confirm(config);
      
      expect(confirmationService.confirm).toHaveBeenCalledWith({
        message: 'Custom message',
        header: 'Custom Header',
        icon: 'pi pi-question',
        acceptLabel: 'OK',
        rejectLabel: 'Cancel',
        acceptIcon: 'pi pi-check',
        rejectIcon: 'pi pi-times',
        acceptButtonStyleClass: 'custom-accept',
        rejectButtonStyleClass: 'custom-reject',
        defaultFocus: 'reject',
        accept: config.accept,
        reject: config.reject
      });
    });

    it('should use default message when not provided', () => {
      jest.spyOn(confirmationService, 'confirm');
      
      service.confirm({ header: 'Test' });
      
      const callArgs = (confirmationService.confirm as jest.Mock).mock.calls[0][0];
      expect(callArgs.message).toBe('Are you sure you want to proceed?');
    });

    it('should use default header when not provided', () => {
      jest.spyOn(confirmationService, 'confirm');
      
      service.confirm({ message: 'Test' });
      
      const callArgs = (confirmationService.confirm as jest.Mock).mock.calls[0][0];
      expect(callArgs.header).toBe('Confirmation');
    });
  });

  describe('confirmDelete method', () => {
    it('should call confirm with delete-specific defaults', () => {
      jest.spyOn(service, 'confirm');
      
      service.confirmDelete();
      
      expect(service.confirm).toHaveBeenCalledWith({
        header: 'Confirm Delete',
        message: 'Are you sure you want to delete this item? This action cannot be undone.',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Delete',
        rejectLabel: 'Cancel',
        acceptButtonStyleClass: 'p-button-danger'
      });
    });

    it('should allow custom message', () => {
      jest.spyOn(service, 'confirm');
      
      service.confirmDelete({
        message: 'Delete this record?'
      });
      
      expect(service.confirm).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Delete this record?',
          header: 'Confirm Delete',
          acceptLabel: 'Delete'
        })
      );
    });

    it('should allow custom accept handler', () => {
      jest.spyOn(service, 'confirm');
      const acceptFn = jest.fn();
      
      service.confirmDelete({
        accept: acceptFn
      });
      
      expect(service.confirm).toHaveBeenCalledWith(
        expect.objectContaining({
          accept: acceptFn
        })
      );
    });
  });

  describe('confirmSave method', () => {
    it('should call confirm with save-specific defaults', () => {
      jest.spyOn(service, 'confirm');
      
      service.confirmSave();
      
      expect(service.confirm).toHaveBeenCalledWith({
        header: 'Confirm Save',
        message: 'Are you sure you want to save these changes?',
        icon: 'pi pi-question-circle',
        acceptLabel: 'Save',
        rejectLabel: 'Cancel'
      });
    });

    it('should allow custom message', () => {
      jest.spyOn(service, 'confirm');
      
      service.confirmSave({
        message: 'Save changes now?'
      });
      
      expect(service.confirm).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Save changes now?',
          header: 'Confirm Save',
          acceptLabel: 'Save'
        })
      );
    });

    it('should allow custom accept handler', () => {
      jest.spyOn(service, 'confirm');
      const acceptFn = jest.fn();
      
      service.confirmSave({
        accept: acceptFn
      });
      
      expect(service.confirm).toHaveBeenCalledWith(
        expect.objectContaining({
          accept: acceptFn
        })
      );
    });
  });

  describe('confirmWarning method', () => {
    it('should call confirm with warning-specific defaults', () => {
      jest.spyOn(service, 'confirm');
      
      service.confirmWarning();
      
      expect(service.confirm).toHaveBeenCalledWith({
        header: 'Warning',
        message: 'This action may have unintended consequences. Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Proceed',
        rejectLabel: 'Cancel',
        acceptButtonStyleClass: 'p-button-warning'
      });
    });

    it('should allow custom message', () => {
      jest.spyOn(service, 'confirm');
      
      service.confirmWarning({
        message: 'This is dangerous!'
      });
      
      expect(service.confirm).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'This is dangerous!',
          header: 'Warning',
          acceptLabel: 'Proceed'
        })
      );
    });

    it('should allow custom accept handler', () => {
      jest.spyOn(service, 'confirm');
      const acceptFn = jest.fn();
      
      service.confirmWarning({
        accept: acceptFn
      });
      
      expect(service.confirm).toHaveBeenCalledWith(
        expect.objectContaining({
          accept: acceptFn
        })
      );
    });
  });

  describe('close method', () => {
    it('should call confirmationService.close', () => {
      jest.spyOn(confirmationService, 'close');
      
      service.close();
      
      expect(confirmationService.close).toHaveBeenCalled();
    });
  });
});

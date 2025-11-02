import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { DialogService } from 'primeng/dynamicdialog';
import { LibDialogService, DialogOptions } from './dialog.service';
import { Component } from '@angular/core';

@Component({
  selector: 'test-component',
  template: '<div>Test Component</div>'
})
class TestComponent {}

describe('LibDialogService', () => {
  let service: LibDialogService;
  let dialogService: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LibDialogService,
        DialogService,
        provideNoopAnimations()
      ]
    });
    service = TestBed.inject(LibDialogService);
    dialogService = TestBed.inject(DialogService);
  });

  describe('Service Initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have DialogService injected', () => {
      expect(dialogService).toBeTruthy();
    });
  });

  describe('open method', () => {
    it('should call dialogService.open with default config', () => {
      jest.spyOn(dialogService, 'open').mockReturnValue({
        onClose: {
          subscribe: jest.fn()
        },
        close: jest.fn()
      } as any);
      
      service.open(TestComponent);
      
      expect(dialogService.open).toHaveBeenCalled();
      const callArgs = (dialogService.open as jest.Mock).mock.calls[0];
      const config = callArgs[1];
      
      expect(config.header).toBe('');
      expect(config.width).toBe('600px');
      expect(config.modal).toBe(true);
      expect(config.dismissableMask).toBe(true);
      expect(config.closable).toBe(true);
      expect(config.closeOnEscape).toBe(true);
      expect(config.baseZIndex).toBe(10000);
      expect(config.maximizable).toBe(false);
    });

    it('should call dialogService.open with custom config', () => {
      jest.spyOn(dialogService, 'open').mockReturnValue({
        onClose: {
          subscribe: jest.fn()
        },
        close: jest.fn()
      } as any);
      
      const options: DialogOptions = {
        header: 'Custom Header',
        width: '800px',
        height: '600px',
        modal: false,
        dismissableMask: false,
        closable: false,
        closeOnEscape: false,
        data: { test: 'data' },
        styleClass: 'custom-class',
        baseZIndex: 20000,
        maximizable: true
      };
      
      service.open(TestComponent, options);
      
      expect(dialogService.open).toHaveBeenCalled();
      const callArgs = (dialogService.open as jest.Mock).mock.calls[0];
      const config = callArgs[1];
      
      expect(config.header).toBe('Custom Header');
      expect(config.width).toBe('800px');
      expect(config.height).toBe('600px');
      expect(config.modal).toBe(false);
      expect(config.dismissableMask).toBe(false);
      expect(config.closable).toBe(false);
      expect(config.closeOnEscape).toBe(false);
      expect(config.data).toEqual({ test: 'data' });
      expect(config.styleClass).toContain('lib-dynamic-dialog');
      expect(config.styleClass).toContain('custom-class');
      expect(config.baseZIndex).toBe(20000);
      expect(config.maximizable).toBe(true);
    });

    it('should include lib-dynamic-dialog in styleClass', () => {
      jest.spyOn(dialogService, 'open').mockReturnValue({
        onClose: {
          subscribe: jest.fn()
        },
        close: jest.fn()
      } as any);
      
      service.open(TestComponent, { styleClass: 'custom' });
      
      const callArgs = (dialogService.open as jest.Mock).mock.calls[0];
      const config = callArgs[1];
      
      expect(config.styleClass).toContain('lib-dynamic-dialog');
      expect(config.styleClass).toContain('custom');
    });

    it('should include default padding in contentStyle', () => {
      jest.spyOn(dialogService, 'open').mockReturnValue({
        onClose: {
          subscribe: jest.fn()
        },
        close: jest.fn()
      } as any);
      
      service.open(TestComponent);
      
      const callArgs = (dialogService.open as jest.Mock).mock.calls[0];
      const config = callArgs[1];
      
      expect(config.contentStyle).toEqual({ padding: '16px' });
    });

    it('should merge custom contentStyle with default', () => {
      jest.spyOn(dialogService, 'open').mockReturnValue({
        onClose: {
          subscribe: jest.fn()
        },
        close: jest.fn()
      } as any);
      
      service.open(TestComponent, { contentStyle: { margin: '20px' } });
      
      const callArgs = (dialogService.open as jest.Mock).mock.calls[0];
      const config = callArgs[1];
      
      expect(config.contentStyle).toEqual({
        padding: '16px',
        margin: '20px'
      });
    });

    it('should return dialog reference', () => {
      const mockRef = {
        onClose: {
          subscribe: jest.fn()
        },
        close: jest.fn()
      };
      jest.spyOn(dialogService, 'open').mockReturnValue(mockRef as any);
      
      const ref = service.open(TestComponent);
      
      expect(ref).toBe(mockRef);
    });
  });

  describe('openSmall method', () => {
    it('should open dialog with small width', () => {
      jest.spyOn(service, 'open').mockReturnValue({
        onClose: {
          subscribe: jest.fn()
        },
        close: jest.fn()
      } as any);
      
      service.openSmall(TestComponent);
      
      expect(service.open).toHaveBeenCalledWith(
        TestComponent,
        expect.objectContaining({ width: '400px' })
      );
    });

    it('should pass additional options', () => {
      jest.spyOn(service, 'open').mockReturnValue({
        onClose: {
          subscribe: jest.fn()
        },
        close: jest.fn()
      } as any);
      
      service.openSmall(TestComponent, { header: 'Small Dialog' });
      
      expect(service.open).toHaveBeenCalledWith(
        TestComponent,
        expect.objectContaining({
          width: '400px',
          header: 'Small Dialog'
        })
      );
    });
  });

  describe('openMedium method', () => {
    it('should open dialog with medium width', () => {
      jest.spyOn(service, 'open').mockReturnValue({
        onClose: {
          subscribe: jest.fn()
        },
        close: jest.fn()
      } as any);
      
      service.openMedium(TestComponent);
      
      expect(service.open).toHaveBeenCalledWith(
        TestComponent,
        expect.objectContaining({ width: '600px' })
      );
    });

    it('should pass additional options', () => {
      jest.spyOn(service, 'open').mockReturnValue({
        onClose: {
          subscribe: jest.fn()
        },
        close: jest.fn()
      } as any);
      
      service.openMedium(TestComponent, { header: 'Medium Dialog' });
      
      expect(service.open).toHaveBeenCalledWith(
        TestComponent,
        expect.objectContaining({
          width: '600px',
          header: 'Medium Dialog'
        })
      );
    });
  });

  describe('openLarge method', () => {
    it('should open dialog with large width', () => {
      jest.spyOn(service, 'open').mockReturnValue({
        onClose: {
          subscribe: jest.fn()
        },
        close: jest.fn()
      } as any);
      
      service.openLarge(TestComponent);
      
      expect(service.open).toHaveBeenCalledWith(
        TestComponent,
        expect.objectContaining({ width: '900px' })
      );
    });

    it('should pass additional options', () => {
      jest.spyOn(service, 'open').mockReturnValue({
        onClose: {
          subscribe: jest.fn()
        },
        close: jest.fn()
      } as any);
      
      service.openLarge(TestComponent, { header: 'Large Dialog' });
      
      expect(service.open).toHaveBeenCalledWith(
        TestComponent,
        expect.objectContaining({
          width: '900px',
          header: 'Large Dialog'
        })
      );
    });
  });

  describe('closeAll method', () => {
    it('should close all dialogs', () => {
      const mockRef1 = {
        destroy: jest.fn()
      };
      const mockRef2 = {
        destroy: jest.fn()
      };
      
      (dialogService as any).dialogComponentRefMap = new Map([
        ['ref1', mockRef1],
        ['ref2', mockRef2]
      ]);
      
      service.closeAll();
      
      expect(mockRef1.destroy).toHaveBeenCalled();
      expect(mockRef2.destroy).toHaveBeenCalled();
    });
  });

  describe('getDialogRef method', () => {
    it('should return null', () => {
      const ref = service.getDialogRef();
      expect(ref).toBeNull();
    });
  });
});

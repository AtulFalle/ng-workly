import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent],
      providers: [provideNoopAnimations(), ConfirmationService, MessageService]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render confirm dialog element', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const dialogElement = compiled.querySelector('p-confirmDialog');
      expect(dialogElement).toBeTruthy();
    });

    it('should render toast element', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const toastElement = compiled.querySelector('p-toast');
      expect(toastElement).toBeTruthy();
    });
  });
});

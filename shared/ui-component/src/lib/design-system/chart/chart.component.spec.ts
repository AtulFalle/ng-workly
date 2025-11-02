import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { ChartType } from './chart.types';
import { ChartData, ChartOptions } from 'chart.js';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  const mockChartData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [{
      label: 'Sales',
      data: [10, 20, 30]
    }]
  };

  const mockChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default type as bar', () => {
      expect(component.type()).toBe('bar');
    });

    it('should have default data as null', () => {
      expect(component.data()).toBeNull();
    });

    it('should have default options as null', () => {
      expect(component.options()).toBeNull();
    });

    it('should have default plugins as empty array', () => {
      expect(component.plugins()).toEqual([]);
    });

    it('should have default styleClass as empty string', () => {
      expect(component.styleClass()).toBe('');
    });
  });

  describe('Input Properties', () => {
    it('should accept type input', () => {
      const types: ChartType[] = ['line', 'bar', 'pie', 'doughnut', 'polarArea', 'radar', 'bubble', 'scatter'];
      types.forEach(type => {
        fixture.componentRef.setInput('type', type);
        fixture.detectChanges();
        expect(component.type()).toBe(type);
      });
    });

    it('should accept data input', () => {
      fixture.componentRef.setInput('data', mockChartData);
      fixture.detectChanges();
      expect(component.data()).toEqual(mockChartData);
    });

    it('should accept options input', () => {
      fixture.componentRef.setInput('options', mockChartOptions);
      fixture.detectChanges();
      expect(component.options()).toEqual(mockChartOptions);
    });

    it('should accept plugins input', () => {
      const plugins = [{ id: 'custom-plugin' }];
      fixture.componentRef.setInput('plugins', plugins);
      fixture.detectChanges();
      expect(component.plugins()).toEqual(plugins);
    });

    it('should accept width input', () => {
      fixture.componentRef.setInput('width', '800px');
      fixture.detectChanges();
      expect(component.width()).toBe('800px');
    });

    it('should accept height input', () => {
      fixture.componentRef.setInput('height', '400px');
      fixture.detectChanges();
      expect(component.height()).toBe('400px');
    });

    it('should accept styleClass input', () => {
      fixture.componentRef.setInput('styleClass', 'custom-chart');
      fixture.detectChanges();
      expect(component.styleClass()).toBe('custom-chart');
    });
  });

  describe('Chart Data Getter', () => {
    it('should return provided data when available', () => {
      fixture.componentRef.setInput('data', mockChartData);
      fixture.detectChanges();
      
      expect(component.chartData).toEqual(mockChartData);
    });

    it('should return default empty data when data is null', () => {
      fixture.componentRef.setInput('data', null);
      fixture.detectChanges();
      
      const defaultData = component.chartData;
      expect(defaultData).toEqual({ labels: [], datasets: [] });
    });

    it('should return default empty data when data is undefined', () => {
      fixture.componentRef.setInput('data', undefined);
      fixture.detectChanges();
      
      const defaultData = component.chartData;
      expect(defaultData).toEqual({ labels: [], datasets: [] });
    });
  });

  describe('Chart Options Getter', () => {
    it('should return provided options when available', () => {
      fixture.componentRef.setInput('options', mockChartOptions);
      fixture.detectChanges();
      
      expect(component.chartOptions).toEqual(mockChartOptions);
    });

    it('should return default options when options is null', () => {
      fixture.componentRef.setInput('options', null);
      fixture.detectChanges();
      
      const defaultOptions = component.chartOptions;
      expect(defaultOptions).toEqual({
        responsive: true,
        maintainAspectRatio: true
      });
    });

    it('should return default options when options is undefined', () => {
      fixture.componentRef.setInput('options', undefined);
      fixture.detectChanges();
      
      const defaultOptions = component.chartOptions;
      expect(defaultOptions).toEqual({
        responsive: true,
        maintainAspectRatio: true
      });
    });
  });

  describe('Component Rendering', () => {
    it('should render chart element', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const chartElement = compiled.querySelector('p-chart');
      expect(chartElement).toBeTruthy();
    });

    it('should render with type', () => {
      fixture.componentRef.setInput('type', 'line');
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement;
      const chartElement = compiled.querySelector('p-chart');
      expect(chartElement).toBeTruthy();
      expect(component.type()).toBe('line');
    });

    it('should render with data', () => {
      fixture.componentRef.setInput('data', mockChartData);
      fixture.detectChanges();
      
      expect(component.chartData).toEqual(mockChartData);
    });
  });

  describe('Combinations', () => {
    it('should work with all chart types', () => {
      const types: ChartType[] = ['line', 'bar', 'pie', 'doughnut', 'polarArea', 'radar', 'bubble', 'scatter'];
      
      types.forEach(type => {
        fixture.componentRef.setInput('type', type);
        fixture.componentRef.setInput('data', mockChartData);
        fixture.componentRef.setInput('options', mockChartOptions);
        fixture.detectChanges();
        
        expect(component.type()).toBe(type);
        expect(component.chartData).toEqual(mockChartData);
        expect(component.chartOptions).toEqual(mockChartOptions);
      });
    });

    it('should work with width and height together', () => {
      fixture.componentRef.setInput('width', '800px');
      fixture.componentRef.setInput('height', '400px');
      fixture.detectChanges();
      
      expect(component.width()).toBe('800px');
      expect(component.height()).toBe('400px');
    });

    it('should work with custom styleClass and plugins', () => {
      const plugins = [{ id: 'plugin1' }, { id: 'plugin2' }];
      fixture.componentRef.setInput('styleClass', 'custom-chart');
      fixture.componentRef.setInput('plugins', plugins);
      fixture.detectChanges();
      
      expect(component.styleClass()).toBe('custom-chart');
      expect(component.plugins()).toEqual(plugins);
    });
  });
});

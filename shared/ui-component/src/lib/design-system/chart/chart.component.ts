import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ChartData, ChartOptions } from 'chart.js';

export type ChartType = 'line' | 'bar' | 'pie' | 'doughnut' | 'polarArea' | 'radar' | 'area' | 'bubble' | 'scatter';

@Component({
  selector: 'lib-chart',
  imports: [
    CommonModule,
    ChartModule
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent {
  // Inputs
  type = input<ChartType>('bar');
  data = input<ChartData | null>(null);
  options = input<ChartOptions | null>(null);
  plugins = input<any[]>([]);
  width = input<string | undefined>(undefined);
  height = input<string | undefined>(undefined);
  styleClass = input<string>('');

  // Chart data and options
  get chartData(): ChartData {
    return this.data() || { labels: [], datasets: [] };
  }

  get chartOptions(): ChartOptions {
    return this.options() || {
      responsive: true,
      maintainAspectRatio: true
    };
  }
}

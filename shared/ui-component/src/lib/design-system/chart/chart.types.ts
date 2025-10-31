// Chart Types and Interfaces
// ===========================
// Type definitions for chart configuration

import { ChartData, ChartOptions } from 'chart.js';

export type ChartType = 'line' | 'bar' | 'pie' | 'doughnut' | 'polarArea' | 'radar' | 'area' | 'bubble' | 'scatter';

export interface ChartConfig {
  type: ChartType;
  data: ChartData;
  options?: ChartOptions;
  plugins?: any[];
  width?: string;
  height?: string;
  styleClass?: string;
}

export interface HrmChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    fill?: boolean;
    tension?: number;
  }[];
}

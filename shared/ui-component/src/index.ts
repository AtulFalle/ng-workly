// Core Configuration
export * from './lib/core/prime-ng.config';
export * from './lib/core/design-system.config';

// Theming System
export * from './lib/theming';

// Components
export * from './lib/components/header/header.component';
export * from './lib/components/footer/footer.component';
export * from './lib/components/sidebar/sidebar.component';
export * from './lib/components/dashboard-layout/dashboard-layout.component';
export * from './lib/components/hrm-demo/hrm-demo.component';
export * from './lib/components/icon-test/icon-test.component';

// Design System Components
export * from './lib/design-system';

// Component Types
export type { UserProfile, NotificationItem } from './lib/components/header/header.component';
export type { FooterLink, FooterSection, SocialLink } from './lib/components/footer/footer.component';
export type { SidebarMenuItem, SidebarSection, UserProfile as SidebarUserProfile } from './lib/components/sidebar/sidebar.component';

// Design System Types
export type { ButtonSeverity, ButtonSize } from './lib/design-system/button/button.component';
export type { InputSize } from './lib/design-system/input/input.component';
export type { 
  DynamicFormConfig, 
  FormControlConfig, 
  FormControlType, 
  FormLayoutType,
  FormControlOption,
  FormValidator,
  FormValue,
  FormError 
} from './lib/design-system/dynamic-form/dynamic-form.types';
export type {
  DialogConfig,
  DialogResult,
  DialogButton,
  DialogSize,
  DialogPosition
} from './lib/design-system/dialog/dialog.types';
export { ConfirmService } from './lib/design-system/dialog/confirm.service';
export { LibDialogService } from './lib/design-system/dialog/dialog.service';
export type { ConfirmConfig } from './lib/design-system/dialog/confirm.service';
export type { DialogOptions } from './lib/design-system/dialog/dialog.service';
export { ToastService } from './lib/design-system/toast/toast.service';
export type { ToastConfig, ToastSeverity, ToastPosition } from './lib/design-system/toast/toast.service';
export { MessageComponent } from './lib/design-system/message/message.component';
export type { MessageSeverity, MessageVariant, MessageSize } from './lib/design-system/message/message.component';
export { ChartComponent } from './lib/design-system/chart/chart.component';
export type { ChartType, ChartConfig, HrmChartData } from './lib/design-system/chart/chart.types';
export { TimelineComponent } from './lib/design-system/timeline/timeline.component';
export type { TimelineItem, TimelineAlignment, TimelineSize, TimelineVariant, TimelineItemStatus, TimelineAction, TimelineConfig } from './lib/design-system/timeline/timeline.types';
export { StatCardComponent } from './lib/components/stat-card/stat-card.component';
export type { StatCardVariant, StatCardSize, StatCardTrend, StatCardConfig } from './lib/components/stat-card/stat-card.types';
// Core Configuration
export * from './lib/core/prime-ng.config';
export * from './lib/core/design-system.config';

// Components
export * from './lib/components/header/header.component';
export * from './lib/components/footer/footer.component';
export * from './lib/components/sidebar/sidebar.component';
export * from './lib/components/icon-test/icon-test.component';

// Component Types
export type { HeaderMenuItem, UserProfile } from './lib/components/header/header.component';
export type { FooterLink, FooterSection, SocialLink } from './lib/components/footer/footer.component';
export type { SidebarMenuItem, SidebarSection, UserProfile as SidebarUserProfile } from './lib/components/sidebar/sidebar.component';
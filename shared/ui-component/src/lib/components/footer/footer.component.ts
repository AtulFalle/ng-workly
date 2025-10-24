import { Component, signal, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// PrimeNG Components
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';

export interface FooterLink {
  label: string;
  url?: string;
  routerLink?: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  name: string;
  icon: string;
  url: string;
  color?: string;
}

@Component({
  selector: 'lib-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DividerModule,
    ButtonModule,
    InputTextModule,
    ChipModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  // Inputs using input() function
  companyName = input<string>('Your Company');
  companyLogo = input<string>();
  description = input<string>('Building amazing applications with modern technology.');
  sections = input<FooterSection[]>([]);
  socialLinks = input<SocialLink[]>([]);
  showNewsletter = input<boolean>(true);
  showSocialLinks = input<boolean>(true);
  showBackToTop = input<boolean>(true);
  copyrightYear = input<number>(new Date().getFullYear());
  additionalLinks = input<FooterLink[]>([]);

  // Outputs using output() function
  linkClick = output<FooterLink>();
  socialClick = output<SocialLink>();
  newsletterSubscribe = output<string>();
  backToTop = output<void>();

  // Component state using signals
  newsletterEmail = signal('false');
  isNewsletterLoading = signal(false);

  // Computed properties
  displaySections = computed(() => {
    const sections = this.sections();
    return sections.length > 0 ? sections : this.defaultSections;
  });

  displaySocialLinks = computed(() => {
    const socialLinks = this.socialLinks();
    return socialLinks.length > 0 ? socialLinks : this.defaultSocialLinks;
  });

  // Default sections if none provided
  private defaultSections: FooterSection[] = [
    {
      title: 'Product',
      links: [
        { label: 'Features', url: '/features' },
        { label: 'Pricing', url: '/pricing' },
        { label: 'Documentation', url: '/docs' },
        { label: 'API', url: '/api' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', url: '/about' },
        { label: 'Blog', url: '/blog' },
        { label: 'Careers', url: '/careers' },
        { label: 'Contact', url: '/contact' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', url: '/help' },
        { label: 'Community', url: '/community' },
        { label: 'Status', url: '/status' },
        { label: 'Security', url: '/security' }
      ]
    }
  ];

  // Default social links if none provided
  private defaultSocialLinks: SocialLink[] = [
    { name: 'Twitter', icon: 'pi pi-twitter', url: '#', color: '#1da1f2' },
    { name: 'Facebook', icon: 'pi pi-facebook', url: '#', color: '#1877f2' },
    { name: 'LinkedIn', icon: 'pi pi-linkedin', url: '#', color: '#0077b5' },
    { name: 'GitHub', icon: 'pi pi-github', url: '#', color: '#333' }
  ];

  onLinkClick(link: FooterLink): void {
    this.linkClick.emit(link);
  }

  onSocialClick(social: SocialLink): void {
    this.socialClick.emit(social);
  }

  onNewsletterSubscribe(): void {
    const email = this.newsletterEmail();
    if (email.trim()) {
      this.isNewsletterLoading.set(true);
      this.newsletterSubscribe.emit(email);
      
      // Simulate API call
      setTimeout(() => {
        this.isNewsletterLoading.set(false);
        this.newsletterEmail.set('');
      }, 2000);
    }
  }

  onBackToTop(): void {
    this.backToTop.emit();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getCurrentYear(): number {
    return this.copyrightYear();
  }
}

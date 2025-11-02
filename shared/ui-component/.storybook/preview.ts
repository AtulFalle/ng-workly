import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { applicationConfig } from '@storybook/angular';
import { providePrimeNG } from 'primeng/config';
import { provideAnimations } from '@angular/platform-browser/animations';
import Aura from '@primeuix/themes/aura';

// Styles are now imported via project.json
// Design tokens and global styles are in: src/lib/styles/design-tokens.scss

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      extractComponentDescription: (component: any, { notes }: { notes?: any }) => {
        if (notes) {
          return typeof notes === 'string' ? notes : notes.markdown || notes.text;
        }
        return null;
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
        {
          name: 'surface',
          value: '#f8f9fa',
        },
      ],
    },
    // Accessibility addon configuration
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'keyboard-accessibility',
            enabled: true,
          },
          {
            id: 'aria-attributes',
            enabled: true,
          },
          {
            id: 'focus-management',
            enabled: true,
          },
        ],
      },
      manual: true,
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    // Provide PrimeNG configuration to generate CSS variables
    applicationConfig({
      providers: [
        provideAnimations(),
        providePrimeNG({
          theme: {
            preset: Aura,
          },
        }),
      ],
    }),
    (story, context) => {
      // Apply dark theme if background is dark
      const isDark = context.globals['backgrounds']?.value === '#1a1a1a';
      if (isDark) {
        document.documentElement.classList.add('p-dark');
      } else {
        document.documentElement.classList.remove('p-dark');
      }
      
      return story();
    },
  ],
};

// Override Storybook's default Nunito Sans font with Lato
// This runs when the preview module loads
if (typeof window !== 'undefined') {
  const applyFontOverrides = () => {
    const style = document.createElement('style');
    style.id = 'lato-font-override';
    style.textContent = `
      body,
      .sbdocs,
      .sbdocs-content,
      .sbdocs-wrapper,
      .docblock-argstable,
      [class*="sbdocs"],
      [class*="docblock"],
      .os-host,
      .os-host-textarea,
      .os-host-textarea > textarea,
      [class*="sidebar"],
      [class*="panel"],
      button,
      input,
      select,
      textarea {
        font-family: 'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif !important;
      }
    `;
    
    // Remove existing override if present
    const existing = document.getElementById('lato-font-override');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(style);
  };

  // Apply immediately if DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyFontOverrides);
  } else {
    applyFontOverrides();
  }
}

export default preview;

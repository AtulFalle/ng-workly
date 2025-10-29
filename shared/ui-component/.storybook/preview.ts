import type { Preview } from '@storybook/angular';

// Import PrimeIcons
// import 'primeicons/primeicons.css';

// Import design system from the shared library (same as app)
// import '../../../dist/libs/src/design-system.scss';

// Import design system styles if available
// import '@workly/design-system';

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
  },
  decorators: [
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
};

export default preview;

import type { StorybookConfig } from '@storybook/angular';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ['../**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [
    getAbsolutePath('@storybook/addon-designs'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-styling-webpack'),
    getAbsolutePath('@storybook/addon-themes'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/angular'),
    options: {},
  },
  webpackFinal: async (config) => {
    // Add SCSS support for design system
    const scssRule = config.module?.rules?.find((rule: any) => {
      return rule.test && rule.test.toString().includes('scss');
    });

    if (scssRule && typeof scssRule === 'object' && 'use' in scssRule) {
      scssRule.use = [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),
            sassOptions: {
              includePaths: [
                'node_modules',
                'libs/src',
                '../../libs/src',
                '../../../libs/src',
              ],
            },
          },
        },
      ];
    }

    // Ensure CSS files are handled properly
    const cssRule = config.module?.rules?.find((rule: any) => {
      return rule.test && rule.test.toString().includes('css') && !rule.test.toString().includes('scss');
    });

    if (cssRule && typeof cssRule === 'object' && 'use' in cssRule) {
      cssRule.use = [
        'style-loader',
        'css-loader',
      ];
    }

    return config;
  },
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value,'package.json')));
}
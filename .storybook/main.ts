import { defineMain } from '@storybook/react-vite/node'

export default defineMain({
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-a11y', '@storybook/addon-docs'],
  core: {
    disableTelemetry: true,
    enableCrashReports: false,
  },
  typescript: {
    // The default, react-docgen, does not support namespace-based prop types. So we use
    // react-docgen-typescript instead to ensure the arg types are properly extracted.
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      exclude: ['.storybook/preview.tsx'],
    },
  },
})

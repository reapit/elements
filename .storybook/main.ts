import path from 'path'

module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-designs',
    '@storybook/addon-docs'
  ],

  loader: { '.js': 'jsx' },

  framework: {
    name: '@storybook/react-vite',
    options: {},
  }
}

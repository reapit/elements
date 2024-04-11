const linaria = require('@wyw-in-js/vite').default
const svgrPlugin = require('@svgr/rollup')
const path = require('path')
const react = require('@vitejs/plugin-react')

module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: [/\.stories\.tsx?$/],
          include: [path.resolve(__dirname, '../src')], // You can specify directories
        },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false },
        },
      },
    },
  ],

  loader: { '.js': 'jsx' },

  async viteFinal(config, { configType }) {
    if (configType === 'DEVELOPMENT') {
      config.optimizeDeps.include = [...config?.optimizeDeps?.include, 'jest-mock']
    }

    config.plugins.push(
      react(),
      linaria(),
      svgrPlugin({
        icon: true,
      }),
    )

    config.define = {
      ...config.define,
      global: 'window',
    }

    return config
  },

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  docs: {
    autodocs: true,
  },
}

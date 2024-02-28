const linaria = require('@linaria/vite').default
const svgrPlugin = require('@svgr/rollup')
const path = require('path')

module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@whitespace/storybook-addon-html',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-mdx-gfm',
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
  core: {
    builder: '@storybook/builder-vite',
  },
  loader: { '.js': 'jsx' },
  async viteFinal(config, { configType }) {
    if (configType === 'DEVELOPMENT') {
      config.optimizeDeps.include = [...config?.optimizeDeps?.include, 'jest-mock']
    }

    config.plugins.push(
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
}

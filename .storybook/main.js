const linaria = require('@linaria/vite').default
const svgrPlugin = require('@svgr/rollup')

module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@whitespace/storybook-addon-html',
    '@storybook/addon-essentials',
    '@storybook/addon-storysource',
    '@storybook/addon-a11y',
    '@storybook/addon-mdx-gfm',
  ],
  loader: { '.js': 'jsx' },
  async viteFinal(config, { configType }) {
    if (configType === 'DEVELOPMENT') {
      config.optimizeDeps.include = [...config?.optimizeDeps?.include, 'jest-mock']
    }

    config.plugins.push(linaria(), svgrPlugin({ icon: true }))

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

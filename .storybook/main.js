const linaria = require('@linaria/vite').default
const svgrPlugin = require('vite-plugin-svgr').default

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@reapit/storybook-addon-html',
    '@storybook/addon-essentials',
    '@storybook/addon-storysource',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
    '@storybook/addon-mdx-gfm',
  ],
  async viteFinal(config, { configType }) {
    if (configType === 'DEVELOPMENT') {
      config.optimizeDeps.include = [...config?.optimizeDeps?.include, 'jest-mock']
    }

    config.plugins.push(
      linaria({
        // babelOptions: {
        //   presets: ['@babel/preset-typescript', ['@babel/preset-react', { runtime: 'automatic' }]],
        //   plugins: [
        //     [
        //       'module-resolver',
        //       {
        //         alias: {
        //           '@': './src',
        //         },
        //       },
        //     ],
        //   ],
        // },
      }),
      svgrPlugin(),
    )

    // config.assetsInclude = ['**/*.svg']
    config.include = '**/*.svg?react'

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

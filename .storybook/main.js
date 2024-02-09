const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
    '@storybook/addon-mdx-gfm'
  ],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config, { configType }) => {
    const fileLoaderRule = config.module.rules.find((rule) => !Array.isArray(rule.test) && rule.test?.test('.svg'))
    fileLoaderRule.exclude = /\.svg$/

    config.module.rules.unshift({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
          },
        },
        'url-loader',
      ],
    })

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: 'esbuild-loader',
          options: {
            loader: 'tsx',
            target: 'es2019',
          },
        },
        {
          loader: '@linaria/webpack-loader',
          options: {
            sourceMap: configType !== 'PRODUCTION',
          },
        },
      ],
    })

    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      }),
    )

    config.stats = {
      cached: false,
      cachedAssets: false,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      modules: false,
    }
    // Return the altered config
    return config
  },

  // async viteFinal(config, { configType }) {
  //   if (configType === "DEVELOPMENT") {
  //     config.optimizeDeps.include = [
  //       ...config?.optimizeDeps?.include,
  //       "jest-mock",
  //     ];
  //   }

  //   config.define = {
  //     ...config.define,
  //     global: "window",
  //   };

  //   return config;
  // },
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: {
    autodocs: true
  }
}

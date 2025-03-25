const { resolve } = require('path');
const webpack = require('webpack');
const withPWA = require('next-pwa');
const withFonts = require('next-fonts');
const envConfig = require(`./config/${process.env.NODE_ENV}.json`);

const POLYFILL_NOMODULE = resolve(
  __dirname,
  'polyfills',
  'polyfill-nomodule.js'
);

module.exports = withPWA(
  withFonts({
    pwa: {
      disable: process.env.NODE_ENV === 'development',
      dest: 'public',
    },
    webpack(config, options) {
      config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]',
          },
        },
      });
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.config': JSON.stringify(envConfig),
        })
      );
      config.resolve = {
        extensions: [
          '.js',
          '.jsx',
          '.json',
          '.scss',
          '.css',
          '.svg',
          '.jpg',
          '.png',
          '.pdf',
          '.zip',
        ],
        alias: {
          ...(config.resolve.alias || {}),
          public: resolve(__dirname, './public'),
          assets: resolve(__dirname, './src/assets'),
          components: resolve(__dirname, './src/components'),
          helpers: resolve(__dirname, './src/helpers'),
          layouts: resolve(__dirname, './src/layouts'),
          pages: resolve(__dirname, './src/pages'),
          services: resolve(__dirname, './src/services'),
          store: resolve(__dirname, './src/store'),
        },
      };
      const originalEntry = options.entry;
      options.entry = async () => {
        const entries = await originalEntry();

        if (entries['static/runtime/polyfills.js']) {
          entries['static/runtime/polyfills.js'] = [ POLYFILL_NOMODULE ];
        }
        return entries;
      };
      return config;
    },
  })
);
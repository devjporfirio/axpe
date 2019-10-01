const { resolve } = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: [
    'whatwg-fetch',
    'babel-polyfill',
    resolve(__dirname, '../src/app.jsx')
  ],
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: 'assets/img/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: 'assets/fonts/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  optimization: {
    // splitChunks: {
    //   cacheGroups: {
    //     commons: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: 'vendors',
    //       chunks: 'all',
    //     },
    //   },
    // },
    minimizer: [ new TerserPlugin() ]
  },
  plugins: []
};

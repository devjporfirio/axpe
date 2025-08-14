
const { resolve } = require('path');
const webpack = require('webpack');
const fs = require('fs');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const nodeEnv = process.env.NODE_ENV || 'development';
const envConfig = JSON.parse(fs.readFileSync(`./config/${nodeEnv}.json`, 'utf-8'));

const nextConfig = {
  // Otimizações seguras para reduzir bundle size
  swcMinify: true,
  compress: true,
  
  images: {
    // unoptimized: true,
    domains: [
      'admin.axpe.com.br',
      'images.axpe.com.br',
      'axpe.com.br',
      'www-hml.axpe.com.br',
      'axpe-frontend.vercel.app',
    ],
    formats: [ 'image/avif', 'image/webp' ],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  compiler: {
    styledComponents: true,
    // removeConsole: nodeEnv === 'production',
  },

  async headers() {
    return [
      {
        source: '/static/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, immutable',
          },
        ],
      },
    ];
  },
  webpack(config, { dev, isServer }) {
    // Otimizações para produção
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
          cacheGroups: {
            // React e React DOM
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react',
              chunks: 'all',
              priority: 40,
            },
            // Styled Components
            styledComponents: {
              test: /[\\/]node_modules[\\/](styled-components)[\\/]/,
              name: 'styled-components',
              chunks: 'all',
              priority: 30,
            },
            // Redux
            redux: {
              test: /[\\/]node_modules[\\/](@reduxjs|redux)[\\/]/,
              name: 'redux',
              chunks: 'all',
              priority: 30,
            },
            // React Slick
            reactSlick: {
              test: /[\\/]node_modules[\\/](react-slick|slick-carousel)[\\/]/,
              name: 'react-slick',
              chunks: 'all',
              priority: 30,
            },
            // Next.js
            next: {
              test: /[\\/]node_modules[\\/](next)[\\/]/,
              name: 'next',
              chunks: 'all',
              priority: 30,
            },
            // Outros vendors
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 20,
            },
            // Código comum
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              enforce: true,
              priority: 10,
            },
          },
        },
      };
    }

    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/i,
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: 100000,
        },
      },
      generator: {
        filename: 'static/chunks/[name].[hash][ext]',
      },
    });

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.config': JSON.stringify(envConfig),
      })
    );

    // Otimização de tree shaking
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      public: resolve(__dirname, './public'),
      assets: resolve(__dirname, './src/assets'),
      components: resolve(__dirname, './src/components'),
      helpers: resolve(__dirname, './src/helpers'),
      layouts: resolve(__dirname, './src/layouts'),
      pages: resolve(__dirname, './src/pages'),
      services: resolve(__dirname, './src/services'),
      store: resolve(__dirname, './src/store'),
    };

    return config;
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(withPWA({
  ...nextConfig,
  pwa: {
    dest: 'public',
    disable: nodeEnv === 'development',
    runtimeCaching,
    buildExcludes: [ /middleware-manifest\.json$/ ],
  },
}));

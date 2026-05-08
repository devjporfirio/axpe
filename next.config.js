const { resolve } = require('path');
const webpack = require('webpack');
const fs = require('fs');

const runtimeCaching = require('next-pwa/cache');

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching,
  buildExcludes: [/middleware-manifest\.json$/],
});

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nodeEnv = process.env.NODE_ENV || 'development';

const envConfig = JSON.parse(
  fs.readFileSync(`./config/${nodeEnv}.json`, 'utf-8')
);

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  compress: true,

  async redirects() {
    return [
      {
        source: '/cadastrar',
        destination: '/',
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/lista-de-favoritos',
        destination: '/Favorites',
      },
    ];
  },

  images: {
    unoptimized: true,
    domains: [
      'admin.axpe.com.br',
      'images.axpe.com.br',
      'axpe.com.br',
      'www-hml.axpe.com.br',
      'axpe-frontend.vercel.app',
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },

  compiler: {
    styledComponents: true,
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
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
        },
      };
    }

    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/i,
      type: 'asset',
    });

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.config': JSON.stringify(envConfig),
      })
    );

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
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

module.exports = withBundleAnalyzer(withPWA(nextConfig));
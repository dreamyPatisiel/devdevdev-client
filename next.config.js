/** @type {import('next').NextConfig} */

const { withSentryConfig } = require('@sentry/nextjs');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  pageExtensions: ['page.tsx'],
};

const sentryWebpackPluginOptions = {
  silent: true, // Sentry Webpack 플러그인의 로그 출력을 조정합니다.
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);

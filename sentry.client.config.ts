import * as Sentry from '@sentry/nextjs';

const SENTRY_DEBUG = process.env.NEXT_PUBLIC_SENTRY_DEBUG === 'true';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN, // 프로젝트의 DSN을 설정하여 Sentry 서버에 이벤트를 전송
  environment: process.env.NODE_ENV, //환경을 설정하여 에러가 발생한 환경을 구분

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0, // 모든 트랜잭션을 추적하도록 샘플링 비율을 1.0으로 설정
  debug: SENTRY_DEBUG, // 디버그 로그를 활성화 (production에서는 비활성화)
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});

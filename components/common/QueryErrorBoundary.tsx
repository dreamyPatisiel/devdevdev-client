import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import ErrorPage from '@pages/_error.page';

import * as Sentry from '@sentry/nextjs';

import DevGuriError from './error/DevGuriError';

export default function QueryErrorBoundary({
  children,
  type = 'page',
}: {
  children: ReactNode;
  type?: 'page' | 'section';
}) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary, error }) => {
        Sentry.captureException(error); // React Query에서 발생하는 비동기 데이터 요청 에러를 처리

        return type === 'page' ? (
          <ErrorPage resetErrorBoundary={resetErrorBoundary} />
        ) : (
          <DevGuriError type='network' resetErrorBoundary={resetErrorBoundary} />
        );
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import router from 'next/router';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import * as Sentry from '@sentry/nextjs';

export default function QueryErrorBoundary({
  children,
  fallbackRender,
}: {
  children: ReactNode;
  fallbackRender: (props: {
    handleRetryClick: () => void;
    resetErrorBoundary: () => void;
  }) => React.ReactNode;
}) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary, error }) => {
        Sentry.captureException(error); // React Query에서 발생하는 비동기 데이터 요청 에러를 처리

        const handleRetryClick = () => {
          resetErrorBoundary();
          router.reload();
        };

        return fallbackRender({ handleRetryClick, resetErrorBoundary });
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

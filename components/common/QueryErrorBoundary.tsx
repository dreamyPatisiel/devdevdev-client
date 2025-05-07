import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import router from 'next/router';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import ErrorPage from '@pages/_error.page';

import * as Sentry from '@sentry/nextjs';

import DevGuriError from './error/DevGuriError';
import DevGuriHorizontalError from './error/DevGuriHorizontalError';
import GetAlertListError from './error/GetAlertListError';
import GetCompanyListError from './error/GetCompanyListError';

type ErrorBoundaryType = 'page' | 'section' | 'horizontal' | 'getCompanyList' | 'getAlertList';

export default function QueryErrorBoundary({
  children,
  type = 'page',
}: {
  children: ReactNode;
  type?: ErrorBoundaryType;
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

        switch (type) {
          case 'page':
            return <ErrorPage resetErrorBoundary={resetErrorBoundary} />;
          case 'section':
            return <DevGuriError type='network' handleRetryClick={handleRetryClick} />;
          case 'horizontal':
            return <DevGuriHorizontalError handleRetryClick={handleRetryClick} />;
          case 'getCompanyList':
            return <GetCompanyListError handleRetryClick={handleRetryClick} />;
          case 'getAlertList':
            return <GetAlertListError handleRetryClick={handleRetryClick} />;
          default:
            return <ErrorPage resetErrorBoundary={resetErrorBoundary} />;
        }
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

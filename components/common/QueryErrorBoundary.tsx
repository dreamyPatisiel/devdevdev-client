import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

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

        switch (type) {
          case 'page':
            return <ErrorPage resetErrorBoundary={resetErrorBoundary} />;
          case 'section':
            return <DevGuriError type='network' resetErrorBoundary={resetErrorBoundary} />;
          case 'horizontal':
            return <DevGuriHorizontalError resetErrorBoundary={resetErrorBoundary} />;
          case 'getCompanyList':
            return <GetCompanyListError resetErrorBoundary={resetErrorBoundary} />;
          case 'getAlertList':
            return <GetAlertListError resetErrorBoundary={resetErrorBoundary} />;
          default:
            return <ErrorPage resetErrorBoundary={resetErrorBoundary} />;
        }
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import ErrorPage from '@pages/_error.page';

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
      fallbackRender={
        type === 'page'
          ? ({ resetErrorBoundary }) => <ErrorPage resetErrorBoundary={resetErrorBoundary} />
          : ({ resetErrorBoundary }) => (
              <DevGuriError type='network' resetErrorBoundary={resetErrorBoundary} />
            )
      }
    >
      {children}
    </ErrorBoundary>
  );
}

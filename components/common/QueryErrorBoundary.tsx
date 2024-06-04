import { ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import ErrorPage from '@pages/_error.page';

import Error from './Error';

export default function QueryErrorBoundary({ children }: { children: ReactNode }) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <ErrorPage resetErrorBoundary={resetErrorBoundary} />
      )}
    >
      {children}
    </ErrorBoundary>
  );
}

export function AsyncErrorBoundary({ children }: { children: ReactNode }) {
  return <ErrorBoundary fallbackRender={() => <Error />}>{children}</ErrorBoundary>;
}

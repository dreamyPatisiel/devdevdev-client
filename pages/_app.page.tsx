import { useEffect, useState } from 'react';

import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import getUserInfoFromLocalStorage from '@utils/getUserInfo';

import { useUserInfoStore } from '@stores/userInfoStore';

import QueryErrorBoundary from '@components/common/QueryErrorBoundary';
import Layout from '@components/common/layout';

import useSetAxiosConfig from '@/api/useSetAxiosConfig';
import { DAY, HALF_DAY } from '@/constants/TimeConstants';
import '@/styles/globals.css';

import * as gtag from '../lib/gtag';

export default function MyApp({ Component, pageProps }: AppProps) {
  const { setUserInfo } = useUserInfoStore();

  useEffect(() => {
    const userInfo = getUserInfoFromLocalStorage();
    if (userInfo?.accessToken) {
      setUserInfo(userInfo);
    }
  }, []);

  useSetAxiosConfig();
  console.log('process.env.NODE_ENV', process.env.NODE_ENV);
  console.log('process.env.NEXT_PUBLIC_VERCEL_ENV', process.env.NEXT_PUBLIC_VERCEL_ENV);
  // || process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
  if (process.env.NODE_ENV !== 'production') {
    const MockServer = () => import('@/_tests_/mocks/Index');
    MockServer();
  }

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: HALF_DAY,
            gcTime: DAY,
            retry: 1,
            throwOnError: true,
          },
        },
      }),
  );

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <QueryErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider enableSystem={false} attribute='class'>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </QueryErrorBoundary>
  );
}

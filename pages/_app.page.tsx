import { useEffect, useState } from 'react';

import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { QueryClient, QueryClientProvider, HydrationBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Layout from '@components/common/layout';
import MetaHead, { type MetaHeadProps } from '@components/meta/MetaHead';

import useSetAxiosConfig from '@/api/useSetAxiosConfig';
import { DAY, HALF_DAY } from '@/constants/TimeConstants';
import { META } from '@/constants/metaData';
import { MediaQueryProvider } from '@/contexts/MediaQueryContext';
import '@/styles/globals.css';

import * as gtag from '../lib/gtag';

type ComponentWithMeta = AppProps['Component'] & { meta?: MetaHeadProps };

export default function MyApp({ Component, pageProps }: AppProps) {
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

  const componentMeta = (Component as ComponentWithMeta)?.meta;
  const meta: MetaHeadProps =
    (pageProps.meta as MetaHeadProps | undefined) ?? componentMeta ?? META.MAIN;

  return (
    <>
      <MetaHead
        title={meta.title}
        description={meta.description}
        keyword={meta.keyword}
        url={meta.url}
        image={meta.image}
      />
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <ThemeProvider enableSystem={false} attribute='class'>
            <MediaQueryProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </MediaQueryProvider>
          </ThemeProvider>
        </HydrationBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

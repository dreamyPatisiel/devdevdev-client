import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Layout from '@/components/layout';

export default function MyApp({ Component, pageProps }: AppProps) {
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
    const MockServer = () => import('@/_tests_/mocks/Index');
    MockServer();
  }

  return (
    <ThemeProvider enableSystem={true} attribute='class'>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

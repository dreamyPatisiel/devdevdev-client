import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta http-equiv='Content-Security-Policy' content='upgrade-insecure-requests' />
      </Head>
      <body className='bg-neutral-100 dark:bg-slate-800'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

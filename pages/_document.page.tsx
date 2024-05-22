import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

import * as gtag from '../lib/gtag';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta http-equiv='Content-Security-Policy' content='upgrade-insecure-requests' />
      </Head>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gtag.GA_TRACKING_ID}', {
          page_path: window.location.pathname,
        });
      `,
        }}
      />
      <body className='bg-neutral-100 dark:bg-slate-800'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

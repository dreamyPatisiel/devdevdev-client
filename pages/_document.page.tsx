import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

import * as gtag from '../lib/gtag';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon/favicon-16x16.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='96x96' href='/favicon/favicon-96x96.png' />
        {/* ms */}
        <link rel='ms-icon' type='image/png' sizes='96x96' href='/favicon/ms-icon-70x70.png' />
        <link rel='ms-icon' type='image/png' sizes='144x144' href='/favicon/ms-icon-144x144.png' />
        <link rel='ms-icon' type='image/png' sizes='150x150' href='/favicon/ms-icon-150x150.png' />
        {/* apple */}
        <link
          rel='apple-touch-icon'
          type='image/png'
          sizes='57x57'
          href='/favicon/apple-icon-57x57.png'
        />
        <link
          rel='apple-touch-icon'
          type='image/png'
          sizes='60x60'
          href='/favicon/apple-icon-60x60.png'
        />
        <link
          rel='apple-touch-icon'
          type='image/png'
          sizes='72x72'
          href='/favicon/apple-icon-72x72.png'
        />
        <link
          rel='apple-touch-icon'
          type='image/png'
          sizes='76x76'
          href='/favicon/apple-icon-76x76.png'
        />
        <link
          rel='apple-touch-icon'
          type='image/png'
          sizes='114x114'
          href='/favicon/apple-icon-114x114.png'
        />
        <link
          rel='apple-touch-icon'
          type='image/png'
          sizes='120x120'
          href='/favicon/apple-icon-120x120.png'
        />
        {/*android  */}
        <link
          rel='android-touch-icon'
          type='image/png'
          sizes='36x36'
          href='/favicon/android-icon-36x36.png'
        />
        <link
          rel='android-touch-icon'
          type='image/png'
          sizes='48x48'
          href='/favicon/android-icon-48x48.png'
        />
        <link
          rel='android-touch-icon'
          type='image/png'
          sizes='72x72'
          href='/favicon/android-icon-72x72.png'
        />
        <link
          rel='android-touch-icon'
          type='image/png'
          sizes='96x96'
          href='/favicon/android-icon-96x96.png'
        />
        <link
          rel='android-touch-icon'
          type='image/png'
          sizes='144x144'
          href='/favicon/android-icon-144x144.png'
        />
        <meta http-equiv='Content-Security-Policy' content='upgrade-insecure-requests' />
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
        <Script
          id='channelTalk'
          strategy='lazyOnload'
          dangerouslySetInnerHTML={{
            __html: `(function() {
         var w = window;
         if (w.ChannelIO) {
           return (window.console.error || window.console.log || function(){})('ChannelIO script included twice.');
         }
         var ch = function() {
           ch.c(arguments);
         };
         ch.q = [];
         ch.c = function(args) {
           ch.q.push(args);
         };
         w.ChannelIO = ch;
         function l() {
           if (w.ChannelIOInitialized) {
             return;
           }
           w.ChannelIOInitialized = true;
           var s = document.createElement('script');
           s.type = 'text/javascript';
           s.async = true;
           s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
           s.charset = 'UTF-8';
           var x = document.getElementsByTagName('script')[0];
           x.parentNode.insertBefore(s, x);
         }
         if (document.readyState === 'complete') {
           l();
         } else if (window.attachEvent) {
           window.attachEvent('onload', l);
         } else {
           window.addEventListener('DOMContentLoaded', l, false);
           window.addEventListener('load', l, false);
         }
       })();
       ChannelIO('boot', {
         "pluginKey": "${process.env.NEXT_PUBLIC_CHANNEL_IO_KEY}"
       });
       `,
          }}
        />
      </Head>

      <body className='bg-neutral-100 dark:bg-slate-800'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

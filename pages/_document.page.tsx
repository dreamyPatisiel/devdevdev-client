import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

import * as gtag from '../lib/gtag';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
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

        {/* 채널톡 */}
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

        {/* Google AdSense */}
        <Script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6815035157823551'
          crossOrigin='anonymous'
        />
      </Head>

      <body className='bg-neutral-100 dark:bg-slate-800'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

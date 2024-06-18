import Head from 'next/head';

import 뎁뎁뎁로고 from '@public/image/devdevdevLogo.svg';

const MetaHead = ({
  title,
  description,
  url,
  image,
}: {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}) => {
  return (
    <Head>
      <title>{title || 'devdevdev'}</title>
      <meta name='description' content={description || '힘들고 막힐 때는 댑댑댑'} />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta property='og:title' content={title || 'devdevdev'} />
      <meta property='og:type' content='website' />
      {/* TODO: 최종 url은 변경 필요 */}
      <meta property='og:url' content={url || 'https://dev.devdevdev.co.kr/'} />
      <meta property='og:image' content={image || 뎁뎁뎁로고} />
      <meta property='og:article:author' content='누구나누리' />
    </Head>
  );
};
export default MetaHead;

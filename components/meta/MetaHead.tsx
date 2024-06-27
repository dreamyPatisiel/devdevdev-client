import Head from 'next/head';

import 뎁구리_og from '@public/image/뎁구리/뎁구리_og.png';

import { META, SITE_URL } from '@/constants/metaData';

const MetaHead = ({
  title,
  description,
  url,
  keyword,
  image,
}: {
  title?: string;
  description?: string;
  url?: string;
  keyword?: string[];
  image?: string;
}) => {
  return (
    <Head>
      <title>{title || META.MAIN.title}</title>
      <meta name='description' content={description || META.MAIN.description} />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta name='keywords' content={keyword?.join(',') || META.MAIN.keyword.join(',')} />
      <meta property='og:title' content={title || META.MAIN.title} />
      <meta property='og:type' content='website' />
      {/* TODO: 최종 url은 변경 필요 */}
      <meta property='og:url' content={url || SITE_URL} />
      <meta property='og:image' content={image || 뎁구리_og.src} />

      {/* 트위터용 */}
      <meta name='twitter:title' content={title || META.MAIN.title} />
      <meta name='twitter:description' content={description || META.MAIN.description} />
      <meta name='twitter:image' content={image || 뎁구리_og.src} />
    </Head>
  );
};
export default MetaHead;

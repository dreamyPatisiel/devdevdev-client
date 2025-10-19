import Head from 'next/head';

import 뎁구리_og from '@public/image/뎁구리/뎁구리_og.png';

import { META, SITE_URL } from '@/constants/metaData';

export type MetaHeadProps = {
  title?: string;
  description?: string;
  url?: string;
  keyword?: string[];
  image?: string;
};

const toAbsoluteUrl = (src: string) => {
  if (/^https?:\/\//.test(src)) {
    return src;
  }

  try {
    return new URL(src, SITE_URL).toString();
  } catch {
    return `${SITE_URL}${src.startsWith('/') ? src : `/${src}`}`;
  }
};

const MetaHead = ({ title, description, url, keyword, image }: MetaHeadProps) => {
  const metaTitle = title ?? META.MAIN.title;
  const metaDescription = description ?? META.MAIN.description;
  const metaKeywords = (keyword ?? META.MAIN.keyword).join(',');
  const metaUrl = url ?? SITE_URL;
  const defaultImage = toAbsoluteUrl(뎁구리_og.src);
  const metaImage = image ? toAbsoluteUrl(image) : defaultImage;

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name='description' content={metaDescription} />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta name='keywords' content={metaKeywords} />

      {/* Open Graph */}
      <meta property='og:title' content={metaTitle} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={metaUrl} />
      <meta property='og:description' content={metaDescription} />
      <meta property='og:image' content={metaImage} />
      <meta property='og:site_name' content='DEVDEVDEV' />

      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={metaTitle} />
      <meta name='twitter:description' content={metaDescription} />
      <meta name='twitter:image' content={metaImage} />
      <meta name='twitter:url' content={metaUrl} />

      <link rel='canonical' href={metaUrl} />
    </Head>
  );
};

export default MetaHead;

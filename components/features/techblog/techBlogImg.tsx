import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import DefaultTechMainImg from '@public/image/techblog/DefaultTechMainImg.png';

export default function TechBlogImg({
  id,
  thumbnailUrl,
  width,
  height,
  rounded = 'rounded-[1.6rem]',
}: {
  id: number;
  thumbnailUrl: string;
  width: string;
  height: string;
  rounded?: string;
}) {
  const [techMainImgUrl, setTechMainImgUrl] = useState<string>(DefaultTechMainImg.src);
  const addClassName = `${width} ${height}`;
  useEffect(() => {
    if (thumbnailUrl) {
      setTechMainImgUrl(thumbnailUrl);
    }
  }, [thumbnailUrl]);

  return (
    <div className={`${addClassName}`}>
      <Link href={`/techblog/${id}`}>
        <img
          className={`${addClassName} ${rounded} object-cover`}
          src={techMainImgUrl}
          alt='기술블로그 썸네일'
        />
      </Link>
    </div>
  );
}

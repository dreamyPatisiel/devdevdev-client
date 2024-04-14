import { HttpResponse, http } from 'msw';

import { TECH_BLOG_DATA } from './../data/techBlogData';

export const techBlogMainHandler = http.get(`/devdevdev/api/v1/articles`, ({ request }) => {
  console.log('msw handler 진입');

  const searchParams = new URL(request.url).searchParams;
  const size = Number(searchParams.get('size'));
  const elasticId = searchParams.get('elasticId');
  const pickSort = Number(searchParams.get('pickSort'));

  const getElasticIdIndex = () => {
    if (!elasticId) return 0;

    console.log('elasticId', elasticId);

    const elasticIdIdx = TECH_BLOG_DATA.data.content.findIndex((el) => el.elasticId === elasticId);

    return elasticIdIdx;
  };

  return HttpResponse.json({
    resultType: TECH_BLOG_DATA.resultType,
    data: {
      content: [TECH_BLOG_DATA.data.content.slice(getElasticIdIndex(), getElasticIdIndex() + size)],
      totalElements: TECH_BLOG_DATA.data.totalElements,
      last: TECH_BLOG_DATA.data.last,
    },
  });
});

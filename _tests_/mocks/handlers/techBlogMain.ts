import { HttpResponse, http } from 'msw';

import { TECH_BLOG_DATA } from './../data/techBlogData';

export const pickpicpickHandler = http.get(`/pickData`, ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const size = Number(searchParams.get('size'));
  const pickSort = Number(searchParams.get('pickSort'));
  const elasticId = Number(searchParams.get('elasticId'));

  // TODO: 데이터 size,sort등에 따라 가공해서 줘야함..어떻게?
  return HttpResponse.json({
    resultType: TECH_BLOG_DATA.resultType,
    data: TECH_BLOG_DATA.data,
  });
});

import { HttpResponse, http } from 'msw';

import { TECH_BLOG_DATA } from './../data/techBlogData';

export const techBlogMainHandler = http.get(`/devdevdev/api/v1/articles`, ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const size = Number(searchParams.get('size'));
  const elasticId = searchParams.get('elasticId');
  const techArticleSort = searchParams.get('techArticleSort');
  const TechBlogDataContent = TECH_BLOG_DATA.data.content;

  let SortTechBlogDataContent = TechBlogDataContent;

  switch (techArticleSort) {
    case 'LATEST': // 최신순
      SortTechBlogDataContent = TechBlogDataContent;
      break;
    case 'POPULAR': // 인기순
      SortTechBlogDataContent = [...TechBlogDataContent].sort(
        (a, b) => b.popularScore - a.popularScore,
      );
      break;
    case 'MOST_VIEWED': // 조회순
      SortTechBlogDataContent = [...TechBlogDataContent].sort(
        (a, b) => b.viewTotalCount - a.viewTotalCount,
      );
      break;
    case 'MOST_COMMENTED': // 댓글 많은순
      SortTechBlogDataContent = [...TechBlogDataContent].sort(
        (a, b) => b.commentTotalCount - a.commentTotalCount,
      );
      break;
    default:
      SortTechBlogDataContent = TechBlogDataContent;
      break;
  }

  const getElasticIdIndex = () => {
    if (!elasticId) return 0;

    console.log('elasticId', elasticId);

    const elasticIdIdx = SortTechBlogDataContent.findIndex((el) => el.elasticId === elasticId);

    return elasticIdIdx;
  };

  return HttpResponse.json({
    resultType: TECH_BLOG_DATA.resultType,
    data: {
      content: SortTechBlogDataContent.slice(getElasticIdIndex(), getElasticIdIndex() + size),
      totalElements: TECH_BLOG_DATA.data.totalElements,
      last: TECH_BLOG_DATA.data.last,
    },
  });
});

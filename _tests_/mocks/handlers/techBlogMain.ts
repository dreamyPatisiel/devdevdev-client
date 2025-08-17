import { HttpResponse, http } from 'msw';

import { TECH_BLOG_DATA } from './../data/techBlogData';

export const techBlogMainHandler = http.get(`/devdevdev/api/v1/articles`, ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const size = Number(searchParams.get('size'));
  const techArticleId = searchParams.get('techArticleId');
  const techArticleSort = searchParams.get('techArticleSort');
  const keyword = searchParams.get('keyword');

  const TechBlogDataContent = TECH_BLOG_DATA.data.content;
  let ResTechBlogDataContent = TechBlogDataContent;
  let ResTotalElements = TECH_BLOG_DATA.data.totalElements;

  switch (techArticleSort) {
    case 'LATEST': // 최신순
      ResTechBlogDataContent = TechBlogDataContent;
      break;
    case 'POPULAR': // 인기순
      ResTechBlogDataContent = [...TechBlogDataContent].sort(
        (a, b) => b.popularScore - a.popularScore,
      );
      break;
    case 'MOST_VIEWED': // 조회순
      ResTechBlogDataContent = [...TechBlogDataContent].sort(
        (a, b) => b.viewTotalCount - a.viewTotalCount,
      );
      break;
    case 'MOST_COMMENTED': // 댓글 많은순
      ResTechBlogDataContent = [...TechBlogDataContent].sort(
        (a, b) => b.commentTotalCount - a.commentTotalCount,
      );
      break;
    default:
      ResTechBlogDataContent = TechBlogDataContent;
      break;
  }

  // 검색 keyword가 있을경우
  if (keyword) {
    ResTechBlogDataContent = TechBlogDataContent.filter((item) => {
      return item.title.includes(keyword) || item.contents.includes(keyword);
    });
    ResTotalElements = ResTechBlogDataContent.length;
  }

  const getElasticIdIndex = () => {
    if (!techArticleId) return 0;
    const elasticIdIdx = ResTechBlogDataContent.findIndex(
      (el) => el.techArticleId === techArticleId,
    );
    return elasticIdIdx + 1;
  };

  return HttpResponse.json({
    status: 200,
    resultType: TECH_BLOG_DATA.resultType,
    data: {
      content: ResTechBlogDataContent.slice(getElasticIdIndex(), getElasticIdIndex() + size),
      totalElements: ResTotalElements,
      last: TECH_BLOG_DATA.data.last,
    },
  });
});

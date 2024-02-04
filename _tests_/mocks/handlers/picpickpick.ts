import { HttpResponse, http } from 'msw';
import { pickData } from '../data/pickData';

export const pickpicpickHandler = http.get(`/pickData`, ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const page = Number(searchParams.get('page'));
  const size = 3;

  return HttpResponse.json({
    status: 200,
    data: pickData.pickData.slice(size * page, size * (page + 1)),
    pageNumber: page,
  });
});

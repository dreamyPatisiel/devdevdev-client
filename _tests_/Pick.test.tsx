// 컴포넌트 테스트
// 질문 API 호출 결과를 화면에 보여준다.
// 답변 두가지 API 호출 결과를 화면에 보여준다.
// 답변 중 selected 값이 null이 아니고 true이면 색칠된 박스, null이 아니고 false 이면 색칠 안된 박스, Null 이면 기본 박스
// 투표 수, 댓글 수 API 호출 결과를 화면에 보여준다.
// 컴포넌트 컨테이너를 클릭하면 /pickpickpick/details 페이지로 이동한다.

import { baseAPI } from '@/core/baseInstance';
import Index from '@/pages/pickpickpick';
import { render, renderHook, waitFor } from '@testing-library/react';
import { handlers } from './mocks/handlers';
import * as pickpickpick from '@src/pickpickpick/api/pickpickpick';
import { pickData } from './mocks/data/pickData';
import { PickDataProps } from '@/src/pickpickpick/types/pick';
import { useState } from 'react';
import { QueryClient, QueryClientProvider, useInfiniteQuery } from '@tanstack/react-query';
import '@/_tests_/mocks/intersectionObserverMock';
import PickContainer from '@/pages/pickpickpick/PickContainer';

interface PickProps {
  question: string;
  answerInfo: {
    answer: string;
    percent: string;
    selected: boolean | null;
  };
  voteCount: number;
  commentCount: number;
}

const setup = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <Index />
    </QueryClientProvider>,
  );
};

describe('픽픽픽 컴포넌트 테스트', () => {
  beforeEach(async () => {
    await waitFor(() => setup());
  });

  it('h1 태그에 "픽픽픽 💖" 문구가 있어야 한다.', async () => {
    // const { container } = await waitFor(() => setup());
    const { container } = setup();
    const h1 = container.querySelector('h1');

    expect(h1?.textContent).toBe('픽픽픽 💖');
  });
  // it('픽픽픽 컴포넌트가 렌더링 되어야 한다.', async () => {
  //   const { getByText, getByTestId, getAllByTestId } = setup();
  //   await waitFor(() => {
  //     expect(getByTestId('pickheart').textContent).toBe('픽픽픽 💖');
  //   });
  //   //     const elements = getAllByTestId('pick');
  //   // elements.forEach((element) => {
  //   //   expect(element.textContent).toBe('픽픽픽 💖');
  //   // });
  // });
  // it('컴포넌트가 렌더링되고 서버에서 가져온 값이 올바르게 표시되는지 확인한다.', async () => {
  //   function generateMockedResponse(page: number) {
  //     return {
  //       page: page,
  //       items: [...pickData.pickData],
  //     };
  //   }

  //   const nock = require('nock');

  //   const expectation = nock('http://localhost:3000')
  //     .persist()
  //     .query(true)
  //     .get('/api/data')
  //     .reply(200, (uri) => {
  //       const url = new URL(`http://localhost:3000/${uri}`);
  //       const { page } = Object.fromEntries(url.searchParams);
  //       return generateMockedResponse(page);
  //     });

  //     const { result, waitFor } = renderHook(() => useInfiniteQueryCustomHook(), {
  //       wrapper,
  //     })

  //     await waitFor(() => result.current.isSuccess)

  //     expect(result.current.data.pages).toStrictEqual(generateMockedResponse(1))

  //     result.current.fetchNextPage()

  //     await waitFor(() =>
  //       expect(result.current.data.pages).toStrictEqual([
  //         ...generateMockedResponse(1),
  //         ...generateMockedResponse(2),
  //       ]),
  //     )

  //     expectation.done()

  //   // const { getByTestId } = setup();

  //   // await waitFor(() => {
  //   //   expect(getByTestId('loaded')).toBeInTheDocument();
  //   // });

  //   // mockData.pages.forEach((group, groupIndex) => {
  //   //   group.forEach((data) => {
  //   //     const pickContainer = getByTestId(`pick-container-${data.id}`);

  //   //     // 필요한 데이터를 사용하여 테스트 진행
  //   //     expect(pickContainer).toBeInTheDocument();
  //   //     // 추가적인 테스트들...
  //   //   });
  //   });

  //   // const { getByText, getByTestId } = render( pickData.pickData.map(()=> (<PickContainer pickData={pickData} />)) );
  //   // console.log('getByTestId', getByTestId);

  //   // await waitFor(() => {
  //   pickData.pickData.forEach((pick: PickDataProps) => {
  //     const { question, answers, voteCount, commentCount } = pick;
  //     // const { answer, percent } = answers;

  //     // expect(getByText(new RegExp(question))).toBeInTheDocument();
  //     // expect(getByText(new RegExp(answer))).toBeInTheDocument();
  //     // expect(getByText(new RegExp(percent))).toBeInTheDocument();

  //     expect(getByTestId('투표').textContent).toBe(voteCount);
  //   });

  // if (
  //   '답변 중 selected 값이 null이 아니고 true이면 색칠된 박스, null이 아니고 false 이면 색칠 안된 박스, null 이면 기본 박스다.'
  // )
  //   it('컴포넌트 컨테이너를 클릭하면 /pickpickpick/details 페이지로 이동한다.');
});

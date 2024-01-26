// 컴포넌트 테스트
// 질문 API 호출 결과를 화면에 보여준다.
// 답변 두가지 API 호출 결과를 화면에 보여준다.
// 답변 중 selected 값이 null이 아니고 true이면 색칠된 박스, null이 아니고 false 이면 색칠 안된 박스, Null 이면 기본 박스
// 투표 수, 댓글 수 API 호출 결과를 화면에 보여준다.
// 컴포넌트 컨테이너를 클릭하면 /pickpickpick/details 페이지로 이동한다.

import { render, waitFor } from '@testing-library/react';

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
  return render(<PickContainer />);
};

describe('픽픽픽 컴포넌트 테스트', () => {
  it('컴포넌트가 렌더링되고 서버에서 가져온 값이 올바르게 표시되는지 확인한다.', async () => {
    const mockedRemoteFn = await waitFor(() => {
      // 서버랑 통신해서 response 값 가져오기
    });
    setup();

    expect(mockedRemoteFn).toHaveBeenCalled();

    pickpickpickList.map((pick: PickProps) => {
      const { getByText, getByTestId } = setup();

      const question = pick.question;
      const answer = pick.answerInfo.answer;
      const percent = pick.answerInfo.percent;
      const questionReg = new RegExp(question);
      const answerReg = new RegExp(answer);
      const percentReg = new RegExp(percent);

      expect(getByText(questionReg)).toBeInTheDocument();
      expect(getByText(answerReg)).toBeInTheDocument();
      expect(getByText(percentReg)).toBeInTheDocument();

      const voteCount = pick.voteCount;
      const commentCount = pick.commentCount;
      const voteCountReg = new RegExp(String(voteCount));
      const commnetCountReg = new RegExp(String(commentCount));

      expect(getByTestId('투표').textContent).toBe(voteCountReg);
      expect(getByTestId('댓글').textContent).toBe(commnetCountReg);
    });
  });

  if (
    '답변 중 selected 값이 null이 아니고 true이면 색칠된 박스, null이 아니고 false 이면 색칠 안된 박스, null 이면 기본 박스다.'
  )
    it('컴포넌트 컨테이너를 클릭하면 /pickpickpick/details 페이지로 이동한다.');
});

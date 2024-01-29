import { HttpResponse, http } from 'msw';

export const pickpicpickHandler = http.get('/pickData', () => {
  return HttpResponse.json(
    {
      pickData: [
        {
          question: '이러이러한 보안 프로세스가 포함된 개발환경에서는 어떤 프로그램이 적절할까요?',
          answers: [
            {
              answer: '사용자가 결제를 진행 후 확인받는 프로세스에서는 Toss의 방식이 적합하다',
              percent: '66',
              picked: true,
            },
            {
              answer: '사용자가 결제를 진행 후 확인받는 프로세스에서는 KaKao 방식이 적합하다',
              percent: '34',
              picked: false,
            },
          ],
          voteCount: '1345',
          commentCount: '324',
        },
        {
          question: '이러이러한 보안 프로세스가 포함된 개발환경에서는 어떤 프로그램이 적절할까요?',
          answers: [
            {
              answer: '사용자가 결제를 진행 후 확인받는 프로세스에서는 Toss의 방식이 적합하다',
              percent: '26',
              picked: true,
            },
            {
              answer: '사용자가 결제를 진행 후 확인받는 프로세스에서는 KaKao 방식이 적합하다',
              percent: '74',
              picked: false,
            },
          ],
          voteCount: '1345',
          commentCount: '324',
        },
        {
          question: '이러이러한 보안 프로세스가 포함된 개발환경에서는 어떤 프로그램이 적절할까요?',
          answers: [
            {
              answer: '사용자가 결제를 진행 후 확인받는 프로세스에서는 Toss의 방식이 적합하다',
              percent: '',
              picked: null,
            },
            {
              answer: '사용자가 결제를 진행 후 확인받는 프로세스에서는 KaKao 방식이 적합하다',
              percent: '',
              picked: null,
            },
          ],
          voteCount: '1345',
          commentCount: '324',
        },
        {
          question: '이러이러한 보안 프로세스가 포함된 개발환경에서는 어떤 프로그램이 적절할까요?',
          answers: [
            {
              answer: '사용자가 결제를 진행 후 확인받는 프로세스에서는 Toss의 방식이 적합하다',
              percent: '',
              picked: null,
            },
            {
              answer: '사용자가 결제를 진행 후 확인받는 프로세스에서는 KaKao 방식이 적합하다',
              percent: '',
              picked: null,
            },
          ],
          voteCount: '1345',
          commentCount: '324',
        },
        {
          question: '이러이러한 보안 프로세스가 포함된 개발환경에서는 어떤 프로그램이 적절할까요?',
          answers: [
            {
              answer: '사용자가 결제를 진행 후 확인받는 프로세스에서는 Toss의 방식이 적합하다',
              percent: '66',
              picked: true,
            },
            {
              answer: '사용자가 결제를 진행 후 확인받는 프로세스에서는 KaKao 방식이 적합하다',
              percent: '34',
              picked: false,
            },
          ],
          voteCount: '1345',
          commentCount: '324',
        },
        {
          question: '이러이러한 보안 프로세스가 포함된 개발환경에서는 어떤 프로그램이 적절할까요?',
          answers: [
            {
              answer: '사용자가 결제를 진행 후 확인받는 프로세스에서는 Toss의 방식이 적합하다',
              percent: '',
              picked: null,
            },
            {
              answer: '사용자가 결제를 진행 후 확인받는 프로세스에서는 KaKao 방식이 적합하다',
              percent: '',
              picked: null,
            },
          ],
          voteCount: '1345',
          commentCount: '324',
        },
        {
          question: '이러이러한 보안 프로세스가 포함된 개발환경에서는 어떤 프로그램이 적절할까요?',
          answers: [
            {
              answer: '사용자가 결제를 진행 후 확인받는 프로세스에서는 Toss의 방식이 적합하다',
              percent: '',
              picked: null,
            },
            {
              answer: '사용자가 결제를 진행 후 확인받는 프로세스에서는 KaKao 방식이 적합하다',
              percent: '',
              picked: null,
            },
          ],
          voteCount: '1345',
          commentCount: '324',
        },
        {
          question: '이러이러한 보안 프로세스가 포함된 개발환경에서는 어떤 프로그램이 적절할까요?',
          answers: [
            {
              answer: '사용자가 결제를 진행 후 확인받는 프로세스에서는 Toss의 방식이 적합하다',
              percent: '66',
              picked: true,
            },
            {
              answer: '사용자가 결제를 진행 후 확인받는 프로세스에서는 KaKao 방식이 적합하다',
              percent: '34',
              picked: false,
            },
          ],
          voteCount: '1345',
          commentCount: '324',
        },
        {
          question: '이러이러한 보안 프로세스가 포함된 개발환경에서는 어떤 프로그램이 적절할까요?',
          answers: [
            {
              answer: '사용자가 결제를 진행 후 확인받는 프로세스에서는 Toss의 방식이 적합하다',
              percent: '',
              picked: null,
            },
            {
              answer: '사용자가 결제를 진행 후 확인받는 프로세스에서는 KaKao 방식이 적합하다',
              percent: '',
              picked: null,
            },
          ],
          voteCount: '1345',
          commentCount: '324',
        },
        {
          question: '이러이러한 보안 프로세스가 포함된 개발환경에서는 어떤 프로그램이 적절할까요?',
          answers: [
            {
              answer: '사용자가 결제를 진행 후 확인받는 프로세스에서는 Toss의 방식이 적합하다',
              percent: '66',
              picked: true,
            },
            {
              answer: '사용자가 결제를 진행 후 확인받는 프로세스에서는 KaKao 방식이 적합하다',
              percent: '34',
              picked: false,
            },
          ],
          voteCount: '1345',
          commentCount: '324',
        },
        {
          question: '이러이러한 보안 프로세스가 포함된 개발환경에서는 어떤 프로그램이 적절할까요?',
          answers: [
            {
              answer: '사용자가 결제를 진행 후 확인받는 프로세스에서는 Toss의 방식이 적합하다',
              percent: '',
              picked: null,
            },
            {
              answer: '사용자가 결제를 진행 후 확인받는 프로세스에서는 KaKao 방식이 적합하다',
              percent: '',
              picked: null,
            },
          ],
          voteCount: '1345',
          commentCount: '324',
        },
        {
          question: '이러이러한 보안 프로세스가 포함된 개발환경에서는 어떤 프로그램이 적절할까요?',
          answers: [
            {
              answer: '사용자가 결제를 진행 후 확인받는 프로세스에서는 Toss의 방식이 적합하다',
              percent: '26',
              picked: true,
            },
            {
              answer: '사용자가 결제를 진행 후 확인받는 프로세스에서는 KaKao 방식이 적합하다',
              percent: '74',
              picked: false,
            },
          ],
          voteCount: '1345',
          commentCount: '324',
        },
        {
          question: '이러이러한 보안 프로세스가 포함된 개발환경에서는 어떤 프로그램이 적절할까요?',
          answers: [
            {
              answer: '사용자가 결제를 진행 후 확인받는 프로세스에서는 Toss의 방식이 적합하다',
              percent: '26',
              picked: true,
            },
            {
              answer: '사용자가 결제를 진행 후 확인받는 프로세스에서는 KaKao 방식이 적합하다',
              percent: '74',
              picked: false,
            },
          ],
          voteCount: '1345',
          commentCount: '324',
        },
      ],
    },
    { status: 200 },
  );
});

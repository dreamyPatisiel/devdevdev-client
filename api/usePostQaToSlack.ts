import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

interface PostQaToSlackProps {
  qaText: string;
  elementInfo: {
    pathName: string;
    tagName: string;
    className: string;
    id: string;
    textContent: string;
  };
}

const postQaToSlack = async ({ qaText, elementInfo }: PostQaToSlackProps) => {
  const SLACK_API =
    'https://hooks.slack.com/services/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';

  const res = await axios({
    method: 'post',
    url: SLACK_API,
    data: `${JSON.stringify({
      text: qaText,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*QA 메시지*\n ${qaText}`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*pathname*\n ${elementInfo.pathName}`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*tagName*\n ${elementInfo.tagName}`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*id*\n ${elementInfo.id}`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*className*\n ${elementInfo.className}`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*textContent*\n ${JSON.stringify(elementInfo.textContent)}`,
          },
        },
      ],
    })}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return res;
};

export const usePostQaToSlack = () => {
  return useMutation({
    mutationFn: postQaToSlack,
    onError: (err) => {
      console.error('에러발생', err);
    },
  });
};

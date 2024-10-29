import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

import { slackConfig } from '@/config';

export interface ElementInfo {
  pathName: string;
  tagName: string;
  className: string;
  id: string;
  textContent: string;
}

interface PostQaToSlackProps {
  qaText: string;
  elementInfo: ElementInfo;
}

const createSlackBlock = (label: string, content: string) => ({
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: `*${label}*\n ${content}`,
  },
});

const postQaToSlack = async ({ qaText, elementInfo }: PostQaToSlackProps) => {
  const payload = {
    text: '새로운 QA 발생!',
    blocks: JSON.stringify([
      createSlackBlock('QA 메시지', qaText),
      createSlackBlock('pathname', elementInfo.pathName),
      createSlackBlock('tagName', elementInfo.tagName),
      createSlackBlock('id', elementInfo.id),
      createSlackBlock('className', elementInfo.className),
      createSlackBlock('textContent', elementInfo.textContent),
    ]),
  };

  const res = await axios({
    method: 'post',
    url: slackConfig.webhookUrl,
    data: JSON.stringify(payload),
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

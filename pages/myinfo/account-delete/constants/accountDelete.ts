import { AccountDeleteInfoListProps } from '../components/AccountDeleteInfoList';

export const STEP_TITLE: Record<number, string> = {
  1: '저희 정말 여기까지인가요? 😢',
  2: '탈퇴하시는 이유를 알려주세요',
  3: '탈퇴하시기 전 확인해주세요!',
};

export const ACCOUNT_DELETE_LIST: AccountDeleteInfoListProps[] = [
  { content: '계정 및 프로필 정보', type: 'delete' },
  { content: '북마크', type: 'delete' },
  { content: '작성한 픽픽픽, 댓글 정보', type: 'keep' },
];

export const DELETE_MESSAGE_COUNT = 10;

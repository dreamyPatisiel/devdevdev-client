import Image from 'next/image';

import tenOverDevguri from '@public/image/myInfo/10_over_devguri.png';
import twentyOverDevguri from '@public/image/myInfo/20_over_devguri.png';
import crystalBall from '@public/image/myInfo/crystal_ball.png';
import wizardDevguri from '@public/image/myInfo/wizard_devguri.png';

export const MYINFO_NICKNAME_EDIT_MODAL = {
  id: crypto.randomUUID(),
  image: <Image src={crystalBall} alt='수정구슬' width={240} height={160} />,
  title: '닉네임을 변경하시겠어요?',
  contents: '마법사 뎁구리가 멋진 닉네임을 지어줄게요',
  submitText: '변경',
  cancelText: '취소',
  size: 's',
} as const;

// 10회 미만 시도
export const MYINFO_NICKNAME_RESULT_MODAL = {
  id: crypto.randomUUID(),
  image: <Image src={wizardDevguri} alt='마법사 댑구리' width={240} height={160} />,
  contents: '닉네임 변경 시 24시간 동안 변경할 수 없어요',
  submitText: '마음에 들어요!',
  cancelText: '바꿔줘요!',
  size: 's',
} as const;

export const MYINFO_NICKNAME_COMPLELTE_MODAL = {
  id: crypto.randomUUID(),
  submitText: '확인',
  size: 's',
} as const;

// 10회 이상 20회 미만 시도
export const MYINFO_NICKNAME_RESULT_10_MODAL = {
  id: crypto.randomUUID(),
  image: <Image src={tenOverDevguri} alt='마법사 댑구리' width={240} height={160} />,
  contents: '닉네임 변경 시 24시간 동안 변경할 수 없어요',
  submitText: '확인',
  cancelText: '다시!',
  size: 's',
} as const;

// 20회 이상 시도
export const MYINFO_NICKNAME_RESULT_20_MODAL = {
  id: crypto.randomUUID(),
  image: <Image src={twentyOverDevguri} alt='마법사 댑구리' width={240} height={160} />,
  contents: '닉네임 변경 시 24시간 동안 변경할 수 없어요',
  submitText: '확인',
  cancelText: '바꿔줘!',
  size: 's',
} as const;

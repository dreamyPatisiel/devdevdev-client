import Image from 'next/image';

import devguriParty from '@public/image/devguri_party.svg';

export const JOIN_SUCCESS_MODAL = {
  id: crypto.randomUUID(),
  image: <Image src={devguriParty} alt='파티하는 댑구리' width={240} height={160} />,
  submitText: '확인',
  cancelText: '닉네임 변경하기',
  size: 's',
} as const;

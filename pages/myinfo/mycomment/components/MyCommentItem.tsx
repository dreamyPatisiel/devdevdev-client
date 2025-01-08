import { formatDate } from '@utils/formatDate';

import NicknameWithMaskedEmail from '@components/common/NicknameWithMaskedEmail';

export default function MyCommentItem({ createdAt = '2023-05-11' }) {
  return (
    <div>
      <div></div>
      <div>
        <NicknameWithMaskedEmail author={'고집불통 댑댑이'} maskedEmail={'4gr*******'} />
        <span className={`c1 text-gray300 ml-[1.6rem]`}>{formatDate(createdAt || '')}</span>
      </div>
    </div>
  );
}

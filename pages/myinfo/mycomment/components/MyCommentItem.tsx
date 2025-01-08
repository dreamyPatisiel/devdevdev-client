import Image from 'next/image';

import { formatDate } from '@utils/formatDate';

import NicknameWithMaskedEmail from '@components/common/NicknameWithMaskedEmail';

import AngleRightIcon from '@public/assets/AngleRightIcon';

export default function MyCommentItem({ createdAt = '2023-05-11' }) {
  return (
    <div className='flex gap-[2.4rem] px-[3.2rem] py-[2.4rem] border border-gray500 rounded-Radius16'>
      <div className='basis-[30%]'>
        <div className='flex gap-[1.6rem] items-baseline'>
          <p className='p1 font-bold text-gray50 '>
            아이유는 국민가수인데요. 여러분은 아이유의 노래 중 무엇이 가장 아이유의 성장에 큰 도움을
            줬다고 생각하시나요?!
          </p>
          <AngleRightIcon color='var(--primary300)' />
        </div>
      </div>

      <div className='basis-[70%] border-l border-l-gray500 pl-[2.4rem] flex flex-col gap-[1.6rem]'>
        <div className='flex justify-between'>
          <span>
            <NicknameWithMaskedEmail author={'고집불통 댑댑이'} maskedEmail={'4gr*******'} />
            <span className={`c1 text-gray300 ml-[1.6rem]`}>{formatDate(createdAt || '')}</span>
          </span>
          <button>삭제</button>
        </div>

        <p className='p2 text-gray50'>
          여러모로 그는 K-팝 아티스트 중 '아티스트'라는 호칭의 고전적 의미에 가장 가까운 스타다.
          음악가로서 그가 본업에 충실하고, 단호하되 과격하지 않게 대중과 소통함으로써 존경을 쌓아온
          한편, 인간 이지은의 성공 신화와 미담은 한국인이 숭배하는 또 다른 가치를 드러낸다.
        </p>
      </div>
    </div>
  );
}

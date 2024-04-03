import { useState } from 'react';

import { EllipsisGradientText } from '@components/EllipsisGradientText';

import AngleDownPoint from '@public/image/pickpickpick/angle-down-point.svg';
import AngleUpPoint from '@public/image/pickpickpick/angle-up-point.svg';

import VoteButton from './VoteButton';

export default function VoteCard({ onClick, voted }: { onClick: () => void; voted: string }) {
  const [isFullContents, setFullContents] = useState(false);

  const handleFullContents = () => {
    setFullContents(!isFullContents);
  };

  return (
    <div
      className={`flex gap-[4rem] px-[4rem] py-[1.6rem] ${!isFullContents && 'max-h-[28.7rem]'}`}
    >
      <div className='px-[4rem] py-[1.6rem] rounded-[1.6rem] border border-gray3 flex flex-col gap-[2.4rem] w-full'>
        <p className='pt-[2.4rem] pb-[3.2rem] text-st1 leading-[2.8rem] font-semibold border-b-[0.1rem] border-b-gray1'>
          사용자가 결제를 진행 후 확인받는 프로세스에서는 Toss의 방법이 더 서버의 비용을 절감하고
          유용합니다.
        </p>

        <EllipsisGradientText
          isFullContents={isFullContents}
          startPercent={isFullContents ? '100%' : '0%'}
          endPercent='100%'
          className={`p1 ${!isFullContents && 'ellipsis'}`}
        >
          Node.js 기술로 CA 개발, Node 서버 개발 등을 진행하며 유저경험 혁신을 함께하실 거예요.
          토스는 일반적인 가상브라우저를 사용하는 방식이 아니라 직접 Low level 까지 요청을
          컨트롤하며, Automation 기술로 특허도 가지고 있을 정도로 상당히 기술적이고 고도화되어
          있어요. 토스가 한국에서는 이 분야 최고라고 장담할 수 있어요. 단순히 API를
          연동하거나Node.js 기술로 CA 개발, Node 서버 개발 등을 진행하며 유저경험 혁신을 함께하실
          거예요. 토스는 일반적인 가상브라우저를 사용하는 방식이 아니라 직접 Low level 까지 요청을
          컨트롤하며, Automation 기술로 특허도 가지고 있을 정도로 상당히 기술적이고 고도화되어
          있어요. 토스가 한국에서는 이 분야 최고라고 장담할 수 있어요. 단순히 API를 연동하거나
          다양한 형태의 데이터를 수집 및 가공 처리하여 API를 안정적으로 제공하기 위해 단순한 CRUD
          구조뿐만 아니라 비동기 데이터 처리 플로우에 최적화된 구성으로 개발하고 있어요.
        </EllipsisGradientText>

        <button
          className={`p2 font-bold text-point1 flex items-center gap-[0.8rem] justify-center `}
          onClick={handleFullContents}
        >
          내용 전체보기
          {isFullContents ? (
            <AngleUpPoint alt='위 방향 화살표' />
          ) : (
            <AngleDownPoint alt='아래 방향 화살표' />
          )}
        </button>
      </div>

      <VoteButton voted={voted} onClick={onClick} />
    </div>
  );
}

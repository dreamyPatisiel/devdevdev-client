import React, { useState } from 'react';

import CompanyInfoCard from '@pages/techblog/components/companyInfoCard';
import { TechCompanyImageCard } from '@pages/techblog/components/techCompanyImageCard';

import NaverLogo from '@public/image/techblog/naverLogo.png';

// TODO: 개발완료후 삭제!!
export default function Index() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className='flex flex-col gap-[1.6rem]'>
      {/* TODO: alt값 필드값으로 더 상세하게 추가할 예정. */}
      <CompanyInfoCard
        ImgElement={<img className='w-[10rem]' src={NaverLogo.src} alt='기업로고' />}
        articleCount={56}
        companyName='토스'
        description='2013년 설립된 전자금융회사로, 2015년 토스(Toss)를 통한 간편송금 
            서비스를 시작으로, 신용등급조회, 토스인증서, 소비관리 등 이용자 친화적인 
            서비스를 제공하고 있습니다. 2021년 3월 기준 누적 사용자 1800만명을 
            기록하고 서비스 출시 3년 만에 테크핀 유니콘 기업으로 성장하였습니다. 현재 
            40여가지 금융서비스를 제공하고 있습니다.'
        industry='금융'
      />
      <ul className='flex flex-row gap-[1.2rem] overflow-x-auto scrollbar-hide scrollbar-x'>
        {Array.from({ length: 9 }).map((_, index) => (
          <TechCompanyImageCard
            key={index} // TODO: 서버에서 내려주는 id값으로 변경
            imgSrc={NaverLogo.src}
            isSelected={selectedIndex === index}
            onClick={() => setSelectedIndex(selectedIndex === index ? null : index)}
          />
        ))}
      </ul>
    </div>
  );
}

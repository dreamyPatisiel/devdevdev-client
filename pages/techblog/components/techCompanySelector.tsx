import { useState } from 'react';

import NaverLogo from '@public/image/techblog/naverLogo.png';

import CompanyInfoCard from './companyInfoCard';
import { TechCompanyImageCard } from './techCompanyImageCard';

/**
 * 기술블로그 구독 회사 선택 컴포넌트
 */
const TechCompanySelector = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // 선택 상태 변경 핸들러
  const handleSelection = (index: number) => {
    // TODO: 토스트 띄우기
    // TODO: 해당 기업 데이터 필터링
    // TODO: 해당 기업 상세 데이터 조회
    const newSelectedIndex = selectedIndex === index ? null : index;
    setSelectedIndex(newSelectedIndex);
    // onCompanySelect(newSelectedIndex);
  };

  return (
    <section>
      <ul className='flex flex-row gap-[1.2rem] overflow-x-auto scrollbar-hide scrollbar-x'>
        {Array.from({ length: 11 }).map((_, index) => (
          <TechCompanyImageCard
            key={index} // TODO: 서버에서 내려주는 id값으로 변경
            imgSrc={NaverLogo.src}
            isSelected={selectedIndex === index}
            onClick={() => handleSelection(index)}
          />
        ))}
      </ul>

      {selectedIndex !== null && (
        <div className='mt-[2.4rem]'>
          <CompanyInfoCard
            ImgElement={<img className='w-[10rem]' src={NaverLogo.src} alt='기업로고' />}
            articleCount={56}
            companyName='토스'
            description='2013년 설립된 전자금융회사로, 2015년 토스(Toss)를 통한 간편송금 서비스를 시작으로, 신용등급조회, 토스인증서, 소비관리 등 이용자 친화적인 서비스를 제공하고 있습니다. 2021년 3월 기준 누적 사용자 1800만명을 기록하고 서비스 출시 3년 만에 테크핀 유니콘 기업으로 성장하였습니다. 현재 40여가지 금융서비스를 제공하고 있습니다.'
            industry='금융'
          />
        </div>
      )}
    </section>
  );
};

export default TechCompanySelector;

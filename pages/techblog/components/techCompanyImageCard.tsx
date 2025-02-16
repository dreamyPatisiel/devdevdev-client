import Image from 'next/image';

import NaverLogo from '@public/image/techblog/naverLogo.png';

export const TechCompanyImageCard = ({
  isSelected,
  onClick,
}: {
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <li
      // TODO: max-w값은 기술블로그 메인 페이지에 넣고 잡아봐야함
      className={`flex items-center justify-center bg-gray700 flex-1 min-w-[10.4rem] max-w-[20rem] h-[6.4rem] rounded-Radius8 ${isSelected ? 'border border-secondary400' : ''}`}
      onClick={onClick}
    >
      <Image alt='기업로고' src={NaverLogo}></Image>
    </li>
  );
};

import { cn } from '@utils/mergeStyle';

import { useMediaQueryContext } from '@/contexts/MediaQueryContext';

export const TechCompanyImageCard = ({
  imgSrc,
  isSelected,
  onClick,
}: {
  imgSrc: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const { isMobile } = useMediaQueryContext();

  const cardSizeClass = isMobile ? 'min-w-[9.6rem] h-[4rem]' : 'min-w-[10.4rem] h-[6.4rem]';

  const companyLogoSizeClass = isMobile ? 'w-[8rem]' : 'w-[10.4rem]';

  return (
    <li
      className={cn(
        `flex items-center justify-center bg-gray700 flex-1 rounded-Radius8 cursor-pointer border 
        ${isSelected ? ' border-secondary400' : 'border-[transparent]'} ${cardSizeClass}`,
      )}
      onClick={onClick}
    >
      <img alt={`${imgSrc}_기업로고`} src={imgSrc} className={`${companyLogoSizeClass}`} />
    </li>
  );
};

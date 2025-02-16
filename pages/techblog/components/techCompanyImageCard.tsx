export const TechCompanyImageCard = ({
  imgSrc,
  isSelected,
  onClick,
}: {
  imgSrc: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <li
      // TODO: max-w값은 기술블로그 메인 페이지에 넣고 잡아봐야함
      className={`flex items-center justify-center bg-gray700 flex-1 min-w-[10.4rem] max-w-[20rem] h-[6.4rem] rounded-Radius8 ${isSelected ? 'border border-secondary400' : ''}`}
      onClick={onClick}
    >
      <img alt={`${imgSrc}_기업로고`} src={imgSrc} />
    </li>
  );
};

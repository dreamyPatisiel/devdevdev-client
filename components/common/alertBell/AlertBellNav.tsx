import { cn } from '@utils/mergeStyle';

import AlertBellIcon from '@public/assets/AlertBellIcon';

export default function AlertBellNav({
  alertCount,
  onClick,
  className,
}: {
  alertCount?: number;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div className={cn(`flex flex-row items-center gap-[0.3rem] ${className}`)} onClick={onClick}>
      <AlertBellIcon color='gray200' />
      <span className='h-[1.6rem] ml-[0.3rem] py-[0.1rem] px-[0.49rem] rounded-RadiusRounded bg-primary500 c2'>
        {alertCount || 0}
      </span>
    </div>
  );
}

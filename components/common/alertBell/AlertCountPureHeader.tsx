import { cn } from '@utils/mergeStyle';

interface AlertListHeaderProps {
  variant: 'tooltip' | 'popup';
  alertCount?: number;
}

const headerClassByVariant = {
  tooltip: 'bg-gray600 flex justify-between items-center px-[1.2rem] pt-[1.6rem] pb-[0.8rem]',
  popup: 'flex flex-row justify-between px-[1.6rem] pt-[3.2rem] pb-[1.6rem] h-auto',
};

const textClassByVariant = {
  tooltip: 'c1 text-gray200',
  popup: 'st2 font-bold text-white',
};

const AlertCountPureHeader = ({ variant = 'tooltip', alertCount }: AlertListHeaderProps) => {
  if (alertCount === 9) {
    throw new Error('test');
  }

  return (
    <header className={cn(headerClassByVariant[variant])}>
      <p className={cn(textClassByVariant[variant])}>
        알림 <span className='text-secondary300'>{alertCount || 0}</span>
      </p>
    </header>
  );
};

export default AlertCountPureHeader;

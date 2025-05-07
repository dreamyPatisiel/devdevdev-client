import { useEffect } from 'react';

import { cn } from '@utils/mergeStyle';

import { useAlertStore } from '@stores/AlertStore';

import useGetAlertCount from '@/api/useGetAlertCount';

export default function AlertCountBadge({ onClick }: { onClick: () => void }) {
  const { data: alertCount } = useGetAlertCount();

  const { setBellDisabled } = useAlertStore();

  const getDisplayAlertCount = (count?: number) => {
    if (!count) return 0;
    return count <= 10 ? count : '10+';
  };

  useEffect(() => {
    if (alertCount === 0) {
      setBellDisabled(true);
    } else {
      setBellDisabled(false);
    }
  }, [alertCount]);

  return (
    <div
      className={cn(
        'flex items-center justify-center px-[0.4rem] h-[1.6rem] rounded-RadiusRounded bg-primary500 cursor-pointer',
        alertCount && alertCount < 10 && 'w-[1.6rem]',
      )}
      onClick={onClick}
    >
      <span className='font-bold c2'>{getDisplayAlertCount(alertCount)}</span>
    </div>
  );
}
